import styled from "styled-components";

const StoryListWrapper = styled.section`
  ul{
    padding: 0;
    margin: 0;
    display: inline-block;
    overflow-x: scroll;
    white-space: nowrap;
    width: 100%;
    &::-webkit-scrollbar{
      display:none;
    }
  }
  
    .wfull{
      width:100%; 
    }
    .hfull{
      height:100%;
    }
    li{
      list-style: none;
      display:inline-block;
      margin: 0 5px;
      figure{
        margin:0;
        height: 100px;
        width: 100px;
        border: 2px solid red;
        border-radius: 50%;
        overflow: hidden;
        img{
          object-fit:contain;
        }
      }
        .icon-name{
          margin: 0;
          color: #333;
          font-size: 12px;
          text-align: center;
          padding-top: 4px;
        }
    }

    .feed-list{
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 24px;
      video{
        width:100%;
      }
    }
`
const StoriesList= ({ stories, onStorySelect }) => {
  return (
    <StoryListWrapper>
      <ul className="stories-list-container">
        {stories.map((story, index) => (
          <li
            key={story.id}
            className="story-preview"
            onClick={() => onStorySelect(index)}
          >
            <figure className="story-preview-image-container">
              <img
                src={story.image}
                alt="Story preview"
                className="story-preview-image wfull hfull"
                loading="lazy"
              />
            </figure>
            <p className="icon-name">{story?.name}</p>
          </li>
        ))}
      </ul>
      <div className="feed-list">
        { stories.length > 0 && stories[0]?.feedList?.map((item, index) => (
          <div className="feeds" key={index}>
            <video src={item?.videoSrc} autoPlay muted playsInline />
          </div>
        ))}
      </div>
    </StoryListWrapper>
  );
};

export default StoriesList;
