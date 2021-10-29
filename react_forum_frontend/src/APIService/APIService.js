import axios from 'axios'
/*
    all_posts_by_discussion = graphene.List(PostType, discussion=graphene.Int(required=True))
    all_discussions_by_category = graphene.List(DiscussionType, category=graphene.Int(required=True))
    all_categories_by_party = graphene.List(CategoryType, party=graphene.Int(required=True))
    all_adventurers_by_party = graphene.List(AdventurerPartyMappingType, party=graphene.Int(required=True))
    get_user_by_id = graphene.Field(AdventurerType, id=graphene.Int(required=True))
    get_party_by_id = graphene.Field(PartyType, id=graphene.Int(required=True))


    create_party =  CreateParty.Field()
    create_adventurer = CreateAdventurer.Field()
    create_category = CreateCategory.Field()
    create_discussion = CreateDiscussion.Field()
    create_post = CreatePost.Field()
    update_party = UpdateParty.Field()
    update_adventurer = UpdateAdventurer.Field()
    update_category = UpdateCategory.Field()
    update_discussion = UpdateDiscussion.Field()
    update_post = UpdatePost.Field()

    mutation CreateParty {
  createParty(name: "AwesomeTestParty") {
    party{
      id
      name
    },
    ok
  }
}
*/

//*************** Queries **********************

const API_ENDPOINT = "http://localhost:8000/graphql"

export const getAllPostsByDiscussion = async (discussionId)  => {
    
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `query($discId: Int!) {
                            allPostsByDiscussion(discussion: $discId) {
                                id,
                                user{
                                    id,
                                    username
                                },
                                discussion{
                                    id
                                },
                                message
                        }
                    }`,
                variables: {
                    discId: discussionId
                }
            }
        )

        return result.data
    } catch (error) {
        console.log(error)
    }
    
}

export const getAllDiscussionsByCategory = async (categoryId)  => {
    
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `query($categoryId: Int!) {
                            allDiscussionsByCategory(category: $categoryId) {
                                id,
                                user{
                                    id,
                                    username
                                },
                                category{
                                    id
                                },  
                                title
                            }
                        }`,
                variables: {
                    categoryId: categoryId
                }
            }
        )

        return result.data

    } catch (error) {
        console.log(error)
    }

}

export const getAllCategoriesByParty = async (partyId)  => {
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `query($partyId: Int!) {
                            allCategoriesByParty(party: $partyId) {
                                id,
                                name,
                                group{
                                    id
                                }
                            }
                        }`,
                variables: {
                    partyId: partyId
                }
            }
        )
        
        return result.data

    } catch (error) {
        console.log(error)
    }

}

export const getAllAdventurersByParty = async (partyId)  => {
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `query($partyId: Int!) {
                            allAdventurersByParty(party: $partyId) {
                                adventurer{
                                    id,
                                    username,
                                    email
                                }
                            }
                        }`,
                variables: {
                    partyId: partyId
                }
            }
        )

        return result.data

    } catch (error) {
        console.log(error)
    }
}

export const getUserById = async (userId)  => {
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `query($userId: Int!) {
                            getUserById(id: $userId) {
                                id,
                                username,
                                email,
                                party{
                                    id
                                }
                            }
                        }`,
                variables: {
                    userId: userId
                }
            }
        )

        return result.data

    } catch (error) {
        console.log(error)
    }
}

export const getPartyById = async (partyId)  => {
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `query($partyId: Int!) {
                            getPartyById(id: $partyId) {
                                id,
                                name,
                                members{
                                    id,
                                    username,
                                    email,
                                }
                            }
                        }`,
                variables: {
                    partyId: partyId
                }
            }
        )

        return result.data

    } catch (error) {
        console.log(error)
    }
}

//*************** Mutations **********************

export const createParty = async (partyName)  => {
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `mutation CreateParty($partyName: String!) {
                            createParty(name: $partyName) {
                                party{
                                    id
                                    name
                                },
                                ok
                            }
                        }`,
                variables: {
                    partyName: partyName
                }
            }
        )

        console.log(result.data)
        return result.data

    } catch (error) {
        console.log(error)
    }
}

export const createAdventurer = async (userName, email, partyId)  => {
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `mutation CreateAdventurer($userName: String!, $email: String!, $partyId: Int!) {
                            createAdventurer(username: $userName, email: $email, party: $partyId) {
                                adventurer{
                                    username,
                                    email,
                                    party{
                                        id,
                                        name
                                    }
                                },
                                ok
                            }
                        }`,
                variables: {
                    userName: userName,
                    email: email,
                    partyId: partyId
                }
            }
        )

        console.log(result.data)
        return result.data

    } catch (error) {
        console.log(error)
    }
}

export const createCategory = async (categoryName, partyId)  => {
    try {
        console.log(categoryName);
        console.log(partyId);
        const result = await axios.post(
            API_ENDPOINT, {
                query: `mutation CreateCategory($categoryName: String!, $partyId: Int!) {
                            createCategory(name: $categoryName, party: $partyId) {
                                category{
                                    id,
                                    name,
                                    group{
                                        id
                                    }
                                },
                                ok
                            }
                        }`,
                variables: {
                    categoryName: categoryName,
                    partyId: partyId
                }
            }
        )

        console.log(result.data)
        return result.data

    } catch (error) {
        console.log(error)
    }
}

export const createDiscussion = async (title, message, categoryId, adventurerId)  => {
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `mutation CreateDiscussion($title: String!, $message: String!, $categoryId: Int!, $adventurerId: Int!) {
                            createDiscussion(title: $title, message: $message, category: $categoryId, adventurer: $adventurerId) {
                                discussion{
                                    id,
                                    title,
                                    category{
                                        id
                                    },
                                    user{
                                        id,
                                        username
                                    }
                                },
                                ok
                            }
                        }`,
                    variables: {
                        title: title,
                        message: message,
                        categoryId: categoryId,
                        adventurerId: adventurerId
                }
            }
        )

        console.log(result.data)
        return result.data

    } catch (error) {
        console.log(error)
    } 
}

export const createPost = async (message, discussion, adventurer)  => {
    console.log(message)
    console.log(discussion)
    console.log(adventurer)
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `mutation CreatePost($message: String!, $discussion: Int!, $adventurer: Int!) {
                            createPost(message: $message, discussion: $discussion, adventurer: $adventurer) {
                                post{
                                    id,
                                    user{
                                        id,
                                        username
                                    },
                                    discussion{
                                        id
                                    },
                                    message
                                },
                                ok
                           }
                        }`,
                variables: {
                    message: message,
                    discussion: discussion,
                    adventurer: adventurer
                    
                }
            }
        )

        console.log(result.data)
        return result.data

    } catch (error) {
        console.log(error)
    }
}

export const updateParty = async (partyId, name)  => {
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `mutation UpdateParty($partyId: Int!, $name: String!) {
                            updateParty(party_id: $partyId, name: $name) {
                                party{ 
                                    id
                                    name
                                },
                                ok
                            }
                        }`,
                variables: {
                    partyId: partyId,
                    name: name
                }
            }
        )
        
        console.log(result.data)
        return result.data

    } catch (error) {
        console.log(error)        
    }
}

export const updateAdventurer = async (adventurerId, userName, email)  => {
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `mutation UpdateAdventurer($adventurerId: Int!, $userName: String!, $email: String!) {
                            updateAdventurer(id: $adventurerId, username: $userName, email: $email) {
                                adventurer{
                                    id,
                                    username
                                },
                                ok
                            }
                        }`,
                variables: {
                    adventurerId: adventurerId,
                    userName: userName,
                    email: email
                }
            }
        )

        console.log(result.data)
        return result.data

    } catch (error) {
        console.log(error)
    }
}

export const updateCategory = async (categoryId, categoryName)  => {
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `mutation UpdateCategory($categoryId: Int!, $categoryName: String!) {
                            updateCategory(id: $categoryId, name: $categoryName) {
                                category{
                                    id,
                                    name,
                                    group{
                                        id
                                    }
                                },
                                ok
                            }
                        }`,
                variables: {
                    categoryId: categoryId,
                    categoryName: categoryName
                }
            }
        )

        console.log(result.data)
        return result.data
    
    } catch (error) {
        console.log(error)
    }
}

export const updateDiscussion = async (discId, title, message, categoryId)  => {
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `mutation UpdateDiscussion($discId: Int!, $title: String!, $message: String!, $categoryId: Int!) {
                            updateDiscussion(discussion_id: $discId, title: $title, message: $message, category: $categoryId) {
                                discussion{
                                    id,
                                    title,
                                    category{
                                        id
                                    },
                                    user{
                                        id
                                    }
                                },
                                ok
                            }
                        }`,
                variables: {
                    discId: discId,
                    title: title,
                    message: message,
                    categoryId: categoryId
                }
            }
        )

        console.log(result.data)
        return result.data        

    } catch (error) {
        console.log(error)
    }
}

export const updatePost = async (postId, message)  => {
    try {
        const result = await axios.post(
            API_ENDPOINT, {
                query: `mutation UpdatePost($postId: Int!, $message: String!) {
                            updatePost(post_id: $postId, message: $message) {
                                post{
                                    id,
                                    message,
                                    user{
                                        id
                                    },
                                    discussion{
                                        id
                                    }
                                },
                                ok
                            }
                        }`,
                variables: {
                    postId: postId,
                    message: message
                }
            }
        )
        
        console.log(result.data)
        return result.data

    } catch (error) {
        console.log(error)
    }
}
