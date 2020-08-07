import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div>Yihua's thoughts</div>
    <h4>{data.allMarkdownRemark.totalCount}</h4>
    <div>
    {
      data.allMarkdownRemark.edges.map(({node}) => (
        <div>
          <span>{ node.frontmatter.title } - { node.frontmatter.date } </span>
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
          excerpt
        }
      }
    }
  }
`