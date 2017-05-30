import React, { Component } from "react";
import ReactDOM from "react-dom";

import YTSearch from "youtube-api-search";
import _ from "lodash";

import SearchBar from "./components/search-bar";
import VideoList from "./components/video-list";
import VideoDetail from "./components/video-detail";

const API_KEY = "AIzaSyC2FoU0EwieJZ4wcIjWxxbIfo7Q95oU0Jw";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch("surfboards"); 
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 200);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
