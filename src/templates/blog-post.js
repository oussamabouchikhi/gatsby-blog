import React from 'react'
import { graphql } from 'gatsby'
import layout from '../components/layout'

export default ({ data }) => {
    const post = data.markdownRemark
    return (
        <layout>
            <div>
                <h1>{post.frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </layout>
    )
}

export const query = graphql`
    query($slug: String) {
        markdownRemark (fields: { slug: {eq: $slug }}) {
            html
            fronmatter {
                title
            }
        }
    }
`