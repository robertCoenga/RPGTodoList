import { JSX } from "react"

type Props = {
    title: JSX.Element;
    color:string;
    body: JSX.Element;
    footer?: JSX.Element;
}
export function CustomCard({title,color, body, footer}: Props){
    const classname = `bg-[#1b1b1b] border-2 p-3 rounded-md`
    return (
        <div id="card" className={classname} style={{borderColor: color}}>
            <div id="title">
                {title}
            </div>
            <div id="body">
                {body}
            </div>
            {footer && (
                <div id="footer" className="items-end">
                    {footer}
                </div>
            )}
        </div>
    );
}