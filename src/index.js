import _ from 'lodash';
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

        this.videoSearch('apple')

    }

    videoSearch(term) {
        YTSearch({
            key: API_KEY,
            term: term
        }, videos => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
            // this.setState({ vidoes: videos });
        })
    }

    render() {

        const videoSearch = _.debounce(term=>{this.videoSearch(term)}, 200)

        return (
            <div>
            <br />
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect = {selectedVideo => {
                        console.log(selectedVideo ,' selected');
                        this.setState({selectedVideo})
                    } }
                    videos={this.state.videos} />
                    <br/>
                    <br/>
                    <br/>
            </div>

        );
    }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'))
