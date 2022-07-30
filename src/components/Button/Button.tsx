import React from "react"

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  noPaddings?: boolean
  fontSize?: string
  text: string
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  fontSize,
  noPaddings = false,
  disabled,
  text,
  ...rest
}) => {
  return (
    <button
      disabled={disabled}
      className={`rounded-full font-bold sm:leading-9
       ${fontSize ? fontSize : "md:text-lg"} ${
        noPaddings ? "" : "py-3 md:px-8 px-3"
      } ${disabled ? "opacity-50" : ""} ${className}`}
      {...rest}
    >
      {text}
    </button>
  )
}

export default Button
