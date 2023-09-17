import React, { useState, ReactNode } from 'react';

interface InputChipsProps {
    label: string;
    className?: string;
}

function InputChips({ label, className }: InputChipsProps) {
    const [chips, setChips] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");

    const onChange = (text: string) => {
        setInput(text);
    };

    const onAddItem = (key: string) => {
        if (key === "Enter" && input.trim() !== "") {
            setChips(prevChips => [...prevChips, input]);
            setInput("");
        }
    };

    const onDeleteItem = (index: number) => {
        setChips(prevChips => {
            const updatedChips = [...prevChips];
            updatedChips.splice(index, 1);
            return updatedChips;
        });
    };

    return (
        <div className={`bg-white px-5 py-4 min-h-[12rem] rounded-xl ${className} flex flex-col`}>
            <div>
                <div className="flex flex-row items-center mb-4">
                    <label className={`x-title w-32 ${label === 'Allergens' ? 'mr-4' : ''}`}>{label}:</label>
                    <input 
                        placeholder="Enter here"
                        className="bg-gray-300 rounded-full h-8 w-60 px-5 uppercase"
                        value={input}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={(e) => onAddItem(e.key)}
                    />
                </div>
                <div className="flex flex-row flex-wrap gap-1 mb-4">
                    {chips.map((chip, index) => (
                        <Chip key={index} onClick={() => onDeleteItem(index)}>
                            {chip}
                        </Chip>
                    ))}
                </div>
            </div>
            {label === 'Allergens' && 
                <button className="self-center mt-auto bg-custom-orange text-white px-7 py-2 rounded">
                    I don't have any allergens
                </button>
            }
        </div>
    );
}

interface ChipProps {
    children: ReactNode;
    onClick?: () => void;
}

function Chip({ children, onClick }: ChipProps) {
    return (
        <div className="bg-gray-300 flex items-center gap-3 rounded-full pl-5 pr-2 h-8 w-max">
            <div className="font-bold uppercase">{children}</div>

            <button
                className="hover:bg-gray-400 flex items-center justify-center rounded-full w-[20px] h-[20px]"
                onClick={onClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 384 512"
                >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
            </button>
        </div>
    );
}

export default InputChips;
