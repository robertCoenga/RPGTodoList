"use client";
import { useState,JSX } from "react";
import { CustomCard } from "./CustomCard";


type Props = {
    icon: JSX.Element;
    title: string;
    children: JSX.Element;
    margin: string;
    buttonPosition: string;
    color: string;
}

export function ExpandableButton ({icon,color, margin, buttonPosition, title,children}: Props){
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = function(){
        if(isOpen)
        {
            setIsOpen(false);
        }
        else{
            setIsOpen(true);
        }
        
    }
    return (
        <div className="relative flex">
        
        <button 
        style={{ "--hover-color": color } as React.CSSProperties}
        className={`rounded-full h-27 w-27 p-4 border-3 z-10 bg-gray-800 border-gray-600 ${margin}  hover:border-[var(--hover-color)]`}  onClick={handleOpen}>
                    {icon}
                </button>
        
        {
            isOpen &&(
                <div className={`absolute top-1/2 -translate-y-1/2 z-50 ${margin}
                    ${buttonPosition == "left" ? "-mx-40": ""}`}>
                    <CustomCard
                    color={color}
                    title={
                        <div className="relative">
                            <div className={`border-b-2 animate-pulse absolute inset-0`} style={{borderColor: color}}/>
                            {buttonPosition == "left" &&(
                                <div className={`flex flex-row gap-2 items-end justify-end relative`}>
                                <h1>{title}</h1>
                                <div className="rotate-y-180">{icon}</div>
                                </div>
                            )}
                            {buttonPosition == "right" &&(
                                <div className={`flex flex-row gap-2 items-end  justify-start relative`}>
                                <div className="rotate-y-180">{icon}</div>
                                <h1>{title}</h1>
                                </div>
                            )}
                        
                        </div>
                        
                    }
                    body={children}
                    footer={<button className="bg-red-600 text-white p-2 rounded-sm" onClick={handleOpen}>fechar</button>}
                    />
                </div>
            )
        }
        </div> 
    );
}