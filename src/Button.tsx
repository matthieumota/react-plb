import { cn } from "./utils"

type ButtonProps = {
} & React.PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, className, ...props }: ButtonProps) {
  // ...props => { id: 5, title: 'toto' } => title="toto" id="5"
  return (
    <button className={cn("bg-slate-500 hover:bg-slate-800 text-white py-1.5 px-4 rounded-md duration-300", className)} {...props}>
      {children}
    </button>
  )
}

export default Button
