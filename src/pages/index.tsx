import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import { HeroSection } from "../components/HeroSection";
import { Layout } from "../components/Layout";
import { UpdootSection } from "../components/UpdootSection";
import { PostsQueryVariables, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
// import { withApollo } from "../utils/withApollo";

//my code
type Props = {
  variables: PostsQueryVariables;
  isLastPage: boolean;
  onLoadMore: (cursor: string) => void;
};

const Page = ({ variables, isLastPage, onLoadMore }: Props) => {
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  // console.log(data?.posts.posts);
  return (
    <>
      <Stack spacing={8}>
        {data?.posts.posts.map((p) =>
          !p ? null : (
            <Flex
              key={p.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderColor="twitter.400"
              borderRadius="2xl"
            >
              <UpdootSection post={p} />
              <Box flex={1}>
                <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                  {/* as attribute added to specify the id of the post which we want to go to */}
                  <Link>
                    <Heading fontSize="xl">{p.title}</Heading>
                  </Link>
                </NextLink>
                <Text>posted by {p.creator.username}</Text>
                <Flex align="center">
                  <Text flex={1} mt={4}>
                    {p.textSnippet}
                  </Text>
                  <Box ml="auto">
                    <EditDeletePostButtons id={p.id} creatorId={p.creator.id} />
                  </Box>
                </Flex>
              </Box>
            </Flex>
          )
        )}
      </Stack>
      <br />
      {(isLastPage && fetching) || (isLastPage && data?.posts.hasMore) ? (
        <Flex>
          <Button
            onClick={() => {
              if (data?.posts) {
                onLoadMore(
                  data.posts.posts[data.posts.posts.length - 1].createdAt
                );
              }
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </>
  );
};

const limit = 15;
//set the number of posts to be shown when the page loads

const Index = () => {
  const [pageVariables, setPageVariables] = useState([
    {
      limit,
      cursor: null as null | string,
    },
  ]);

  return (
    <Layout>
      <HeroSection />
      {pageVariables.map((variables, i) => {
        return (
          <Page
            key={"" + variables.cursor}
            variables={variables}
            isLastPage={i === pageVariables.length - 1}
            onLoadMore={(cursor) =>
              setPageVariables([...pageVariables, { cursor, limit }])
            }
          />
        );
      })}
    </Layout>
  );
};

// const Index = () => {
//   const { data, error, loading, fetchMore, variables } = usePostsQuery({
//     variables: {
//       limit: 15,
//       cursor: null,
//     },
//     notifyOnNetworkStatusChange: true,
//   });

//   if (!loading && !data) {
//     return (
//       <div>
//         <div>you got query failed for some reason</div>
//         <div>{error?.message}</div>
//       </div>
//     );
//   }

//   return (
//     <Layout>
//       <HeroSection />
//       {!data && loading ? (
//         <div>loading...</div>
//       ) : (
//         <Stack spacing={8}>
//           {data!.posts.posts.map((p) =>
//             !p ? null : (
//               <Flex
//                 key={p.id}
//                 p={5}
//                 shadow="md"
//                 borderWidth="1px"
//                 borderColor="twitter.400"
//                 borderRadius="2xl"
//               >
//                 <UpdootSection post={p} />
//                 <Box flex={1}>
//                   <NextLink href="/post/[id]" as={`/post/${p.id}`}>
//                     <Link>
//                       <Heading fontSize="xl">{p.title}</Heading>
//                     </Link>
//                   </NextLink>
//                   <Text>posted by {p.creator.username}</Text>
//                   <Flex align="center">
//                     <Text flex={1} mt={4}>
//                       {p.textSnippet}
//                     </Text>
//                     <Box ml="auto">
//                       <EditDeletePostButtons
//                         id={p.id}
//                         creatorId={p.creator.id}
//                       />
//                     </Box>
//                   </Flex>
//                 </Box>
//               </Flex>
//             )
//           )}
//         </Stack>
//       )}
//       {data && data.posts.hasMore ? (
//         <Flex>
//           <Button
//             onClick={() => {
//               fetchMore({
//                 variables: {
//                   limit: variables?.limit,
//                   cursor:
//                     data.posts.posts[data.posts.posts.length - 1].createdAt,
//                 },
//               });
//             }}
//             isLoading={loading}
//             m="auto"
//             my={8}
//           >
//             load more
//           </Button>
//         </Flex>
//       ) : null}
//     </Layout>
//   );
// };

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
