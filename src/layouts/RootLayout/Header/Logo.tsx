import Link from "next/link"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"
import Image from "next/image"

const Logo = () => {
  return (
    <StyledWrapper href="/" aria-label={CONFIG.blog.title}>
      <Image
        src={CONFIG.profile.image}
        alt={CONFIG.blog.title}
        width="40"
        height="40"
      />
      {CONFIG.blog.title}
    </StyledWrapper>
  )
}

export default Logo

const StyledWrapper = styled(Link)`
  flex-direction: row;
  align-items: center;
  display: flex;
  gap: 0.5rem;
`
