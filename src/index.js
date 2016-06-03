import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyC6L09xnPUR_9JhdUbvqjKLa78UVpVXi7Y';



//  Create a new component. This component should produce some html-
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        }

        YTSearch({
            key: API_KEY,
            term: 'apple'
        }, videos => {
            console.log('vidoes: ', videos);
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
            // this.setState({ vidoes: videos });
        })
    }

    render() {
        return (
            <div>
            <br />
                <SearchBar />
                <hr/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect = {selectedVideo => this.setState({selectedVideo}) }
                    videos={this.state.videos} />
            </div>
        );
    }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'))
