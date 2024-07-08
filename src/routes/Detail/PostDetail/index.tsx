import React from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import { motion } from "framer-motion"

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()

  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper>
      <article>
        {category && (
          <motion.div
            css={{ marginBottom: "0.5rem" }}
            layoutId={`category-${data.id}`}
            layout
          >
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
            </Category>
          </motion.div>
        )}
        {data.type[0] === "Post" && <PostHeader data={data} />}
        <div>
          <NotionRenderer recordMap={data.recordMap} />
        </div>
        {data.type[0] === "Post" && (
          <>
            <Footer />
            <CommentBox data={data} />
          </>
        )}
      </article>
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  padding-bottom: 3rem;
  @media only screen and (min-width: 600px) {
    padding-top: 3rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 1.5rem;
    max-width: 70rem;
  }

  margin: 0 auto;
  > article {
    margin: 0 auto;
    max-width: 62rem;
  }

  .notion-page {
    width: 100% !important;
    @media (min-width: 1024px) {
      width: 90% !important;
    }
  }
`
