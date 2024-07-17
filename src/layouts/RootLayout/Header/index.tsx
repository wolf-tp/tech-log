import NavBar from "./NavBar"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"
import styled from "@emotion/styled"
import { zIndexes } from "src/styles/zIndexes"
import { motion } from "framer-motion"
import LoginDialog from "src/components/Login"
import { useRef } from "react"

type Props = {
  fullWidth: boolean
}

const Header: React.FC<Props> = ({ fullWidth }) => {
  const dialogRef = useRef<DialogRef>(null)

  return (
    <>
      <StyledWrapper>
        <motion.div
          layout
          data-full-width={fullWidth}
          className="container"
          layoutId="blog-header"
        >
          <Logo />
          <div className="nav">
            <ThemeToggle />
            <NavBar onLoginClick={dialogRef.current?.open} />
          </div>
        </motion.div>
      </StyledWrapper>
      <LoginDialog ref={dialogRef} />
    </>
  )
}

export default Header

const StyledWrapper = styled.div`
  z-index: ${zIndexes.header};
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.gray2};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  .container {
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1120px;
    height: 3rem;
    margin: 0 auto;
    &[data-full-width="true"] {
      @media (min-width: 768px) {
        padding-left: 6rem;
        padding-right: 6rem;
      }
    }
    .nav {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }
  }
`
