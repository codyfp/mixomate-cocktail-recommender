import { UserApi } from './../clientApi/UserApi';

const LikesAndDislikes = () => {

  const handlePostLikes = () => {
    const userApi = new UserApi();
    userApi.setLikesAndDislikes(["coffee", "whiskey", "bourbon"], ["tequila", "vodka"]);
  }

  return (
    <div className='flex flex-col'>
      <p>Likes and Dislikes</p>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handlePostLikes}>PostLikesDislikes</button>
    </div>
  )
}

export default LikesAndDislikes;