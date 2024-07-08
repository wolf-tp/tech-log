import Link from "next/link"
import { CONFIG } from "site.config"
import { formatDate } from "src/libs/utils"
import Tag from "../../../components/Tag"
import { TPost } from "../../../types"
import Image from "next/image"
import Category from "../../../components/Category"
import styled from "@emotion/styled"
import { motion } from "framer-motion"

type Props = {
  data: TPost
}

const PostCard: React.FC<Props> = ({ data }) => {
  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper href={`/${data.slug}`}>
      <article>
        {category && (
          <div className="category">
            <Category>{category}</Category>
          </div>
        )}
        {data.thumbnail && (
          <motion.div
            layoutId={`preview-img-${data.id}`}
            layout
            className="thumbnail"
          >
            <Image
              src={data.thumbnail}
              fill
              alt={data.title}
              css={{ objectFit: "cover" }}
            />
          </motion.div>
        )}
        <div
          data-thumb={!!data.thumbnail}
          data-category={!!category}
          className="content"
        >
          <header className="top">
            <motion.h3 layoutId={`title-${data.id}`} layout>
              {data.title}
            </motion.h3>
          </header>

          {data?.author?.[0]?.name && (
            <div className="author">
              <Image
                css={{ borderRadius: "50%" }}
                src={data.author[0].profile_photo || CONFIG.profile.image}
                alt="profile_photo"
                width={30}
                height={30}
              />
              <div>
                <div className="author-name">{data.author[0].name}</div>
                <div>
                  {formatDate(
                    data?.date?.start_date || data.createdTime,
                    CONFIG.lang
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="summary">
            <p>{data.summary}</p>
          </div>

          <div className="tags">
            {data.tags &&
              data.tags.map((tag: string, idx: number) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
          </div>
        </div>
      </article>
    </StyledWrapper>
  )
}

export default PostCard

const StyledWrapper = styled(Link)`
  article {
    overflow: hidden;
    position: relative;
    margin-bottom: 1.5rem;
    border-radius: 1rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};
    transition-property: box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);

    @media (min-width: 1024px) {
      :hover {
        box-shadow: 0 10px 15px -3px rgba(56, 111, 185, 0.4),
          0 4px 6px -2px rgba(56, 111, 185, 0.25);
      }
    }

    > .category {
      position: absolute;
      top: 1rem;
      left: 1rem;
      z-index: 10;
    }

    > .thumbnail {
      position: relative;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.gray2};
      padding-bottom: 66%;

      @media (min-width: 1024px) {
        padding-bottom: 50%;
      }
    }
    > .content {
      padding: 1rem;

      &[data-thumb="false"] {
        padding-top: 3.5rem;
      }
      &[data-category="false"] {
        padding-top: 1.5rem;
      }
      > .top {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (min-width: 768px) {
          flex-direction: row;
          align-items: baseline;
        }
        h3 {
          margin-bottom: 0.2rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
          font-weight: 500;

          cursor: pointer;

          @media (min-width: 768px) {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
        }
      }
      > .date {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        .content {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: ${({ theme }) => theme.colors.gray10};
          @media (min-width: 768px) {
            margin-left: 0;
          }
        }
      }
      > .author {
        margin-top: 0.5rem;
        display: flex;
        gap: 0.5rem;
        align-items: center;
        div {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: ${({ theme }) => theme.colors.gray10};
          .author-name {
            font-weight: 700;
            color: ${({ theme }) => theme.colors.gray11};
          }
        }
      }
      > .summary {
        p {
          font-size: 0.875rem;
          line-height: 1.5rem;
          color: ${({ theme }) => theme.colors.gray11};
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3; /* number of lines to show */
          line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
      > .tags {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
`
