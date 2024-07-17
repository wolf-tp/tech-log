import ReactModal from "react-modal"

export const DEFAULT_CATEGORY = "📚 All" as string

export const DIALOG_STYLES: ReactModal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    backgroundColor: "transparent",
    overflow: "hidden",
    padding: 10,
  },
  overlay: {
    backdropFilter: "blur(5px)",
    backgroundColor: "transparent",
    zIndex: 100,
  },
}

export const ONE_MINUTE = 60 * 1000
export const ONE_HOUR = 60 * ONE_MINUTE
export const ONE_DAY = 24 * ONE_HOUR
