import React from "react"
import { graphql, Link } from "gatsby"

import styled from "styled-components"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
  &:hover {
    color: blue;
  }
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: rebeccapurple;
`

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h4>My thoughts: {data.allMarkdownRemark.totalCount}</h4>
    <div>
    {
      data.allMarkdownRemark.edges.map(({node}) => (
        <div>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              { node.frontmatter.title } - { node.frontmatter.date } 
            </BlogTitle>
          </BlogLink>
          <p>{ node.excerpt }</p>
        </div>
      ))
    }
    </div>
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            description
            title
            date
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`