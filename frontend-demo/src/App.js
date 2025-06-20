import { useState } from "react";
import stories from "./data/userList";
import StoriesList from "./components/stories-list";
import styled from "styled-components";
import ViewStory from "./components/view-story";

const InstagramWrapper = styled.section`
  display: flex;
  max-width: 100%;
  width: 420px;
  flex-direction: column;
  margin: 0 auto;
`
function App() {
  // console.log("userData", userData);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);

  return (
    <InstagramWrapper className="app-wrapper">
      <h1 className="app-title">Instagram Stories</h1>

      <StoriesList
        stories={stories}
        onStorySelect={(index) => setSelectedStoryIndex(index)}
      />

      {selectedStoryIndex !== null && (
        <ViewStory
          stories={stories}
          initialIndex={selectedStoryIndex}
          onClose={() => setSelectedStoryIndex(null)}
        />
      )}
    </InstagramWrapper>
  );
}

export default App;
