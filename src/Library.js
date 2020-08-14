import React from 'react';


class Library extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      api_key: "AIzaSyB_QCE1mKDbbtRTXsLmeZvsOHN0ozURJqA",
      no_image: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
    };
  }

  componentDidMount() {
    fetch("https://www.googleapis.com/books/v1/volumes?q=you&max_results=40&orderBy=newest&projection=lite&key="+this.state.api_key+"")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="library-views columns is-multiline">
          {items.map(item => (
            <div key={item.id} className="column is-4">
              <p className="is-info">{item.volumeInfo.title}, {item.volumeInfo.publishedDate}</p>
              <img src={'imageLinks' in item.volumeInfo ?
               item.volumeInfo.imageLinks.smallThumbnail :
              this.state.no_image} alt="item.volumeInfo.title"/>
                <p>{item.volumeInfo.authors + " "}</p>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default Library;
