const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreate = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode })

        createNodeField({
            node,
            name: `slug`,
            value: slug
        })
    } 
}

exports.createPage = ({ graphql, actions }) => {
    const { createPage } = actions
    return grapgh(`
        allMarkdownRemark {
            edges {
                node {
                    fields {
                        slug
                    }
                }
            }
        }
    `).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({node}) => {          
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/blog-post.js`),
                context: node.fields.slug
            })
        })

    })
}