import InputChips from './InputChips'

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
  )
}

export default LikesAndDislikes
