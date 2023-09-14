import { useState } from "react";

function LikesAndDislikes() {
  return (
    <div className="flex flex-row">
      <div className="pr-14 w-3/5">
        <h1 className="x-title mb-8 text-center">List your preferences!</h1>

        <InputChips label="Likes" className="mb-8" />

        <InputChips label="Dislikes" />
      </div>

      <div className="pl-14 h-[30rem] w-2/5">
        <div className="rounded-xl overflow-hidden h-full w-full">
          <img
            src="images/cocktails.jpg"
            alt="Cocktails"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

 export default LikesAndDislikes;

function InputChips({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const [chips, setChips] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const onChange = (text: string) => {
    setInput(text);
  };

  const onAddItem = (key: string) => {
    if (key === "Enter" && input.trim() !== "") {
      const _chips = [...chips];

      _chips.push(input);

      setChips(_chips);
      setInput("");
    }
  };

  const onDeleteItem = (index: number) => {
    const _chips = [...chips];

    _chips.splice(index, 1);

    setChips(_chips);
  };

  return (
    <div className={`bg-white px-5 py-4 min-h-[12rem] rounded-xl ${className}`}>
      <div className="flex flex-row items-center mb-4">
        <label className="x-title w-32">{label}:</label>

        <input
          className="bg-gray-300 rounded-full h-8 w-60 px-5 uppercase"
          value={input}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => onAddItem(e.key)}
        />
      </div>

      <div className="flex flex-row flex-wrap gap-1">
        {chips.map((chip, index) => (
          <Chip key={index} onClick={() => onDeleteItem(index)}>
            {chip}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
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