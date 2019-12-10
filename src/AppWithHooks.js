import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Card from './card.js'
import Collection from './collection.js'
import PostForm from './postform.js'
import axios from 'axios'
import './index.css'

//Reworked App class to be functional component
//Replaced state with hooks, using "setCurrentCard" etc every time state was changed.
//Ddded "function" before internal functions
//Removed all occurances of "this."
//useEffect replaces componentDidMount(). Was previously setting state.sideBarActive array in the .then, but useState is not allowed in callbacks, so had to "cheat" and give the Array a value of 2 when it's created, instead of setting it to data.length. 

// class App extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       collActive: null,
//       currentCard: 0,
//       frontOfCard: true,
//       data: [],
//       title: '',
//       def: ''
//     }

function App(){
    const [collActive, setCollActive] = useState(null);
    const [currentCard, setCurrentCard] = useState(0);
    const [frontOfCard, setFrontofCard] = useState(true);
    const [data, setData] = useState([]);
    const [sideBarActive, setSideBarActive] = useState((Array(2).fill('red')));

  
  // Axios get to create data for cards 

  //componentDidMount()

  useEffect(() => {
    axios.get('http://localhost:3000/collections')
      .then(res => {
        const resdata = res.data
        setData(resdata);
      })
  })

  // Creates sidebar div and fills it with a collection for each collection in the data

  function createCollections(){
    return (
      <div className='sideBar' >
        <h3 className="titleHead">Collections</h3>
        {data.map(item => renderCollection(item)
        )}
      </div>
    );
  }

  // Renders a single collection based on collection from data, color based on sideActive array

  function renderCollection (item) {
    return (
      <Collection
        title={item.title}
        key={item.id}
        color= {sideBarActive[item.id - 1]}
        length={item.cards.length}
        handleClick={() => collectionClick(item.id)}
      />
    )
  }

  // Sets active collection when clicking in sidebar, resets sideBarActive array to display correct color for each collection

  function collectionClick (i) {
    const activeSideColor = Array(data.length).fill('red');
    activeSideColor[i - 1] = 'blue';
    setSideBarActive(activeSideColor);
    setCollActive(i - 1);
    setCurrentCard(0);
    setFrontofCard(true);
    // this.setState({
    //   sideBarActive: sideBarActive,
    //   collActive: i - 1,
    //   currentCard: 0,
    //   frontOfCard: true
    // })
  }

  // Renders active card from active collection and arrows that traverse collection

  function renderCardAndArrows (id) {
    if (collActive == null) {
      return (
        <div></div>
      )
    } else {
      if (frontOfCard) {
        return (
          <div>
            <button className="leftArrow" onClick={() => leftArrow()}>
              <p> Prev </p>
            </button>
            <Card text={data[collActive].cards[id].word}
              id={id}
              handleClick={() => handleFlip()}
            />
            <button className="rightArrow" onClick={() => rightArrow()}>
              <p> Next </p>
            </button>
          </div>
        )
      } else {
        return (
          <div>
            <button className="leftArrow" onClick={() => leftArrow()}>
              <p> Prev </p>
            </button>
            <Card text={data[collActive].cards[id].definition}
              id={id}
              handleClick={() => handleFlip()}
            />
            <button className="rightArrow" onClick={() => rightArrow()}>
              <p> Next </p>
            </button>
          </div>
        )
      }
    }
  }

  function handleFlip () {
    setFrontofCard(!frontOfCard);
    // this.setState({
    //   frontOfCard: !this.state.frontOfCard
    // })
  }

  // Arrow functions are onClicks of the above arrow buttons that change state.currentCard and goes to other end of collection when reaching end.

  function leftArrow () {
    if (currentCard === 0) {
      setCurrentCard(data[collActive].cards.length - 1);
      setFrontofCard(true);
      // this.setState({
      //   currentCard: (data[collActive].cards.length - 1),
      //   frontOfCard: true
      // })
    } else {
      setCurrentCard(currentCard -1);
      setFrontofCard(true);
      // this.setState({
      //   currentCard: (currentCard - 1),
      //   frontOfCard: true
      // })
    }
  }

  function rightArrow () {
    if (currentCard === (data[collActive].cards.length - 1)) {
      setCurrentCard(0);
      setFrontofCard(true);

      // this.setState({
      //   currentCard: 0,
      //   frontOfCard: true
      // })
    } else {
      setCurrentCard(currentCard + 1);
      setFrontofCard(true);
      // this.setState({
      //   currentCard: (this.state.currentCard + 1),
      //   frontOfCard: true
      // })
    }
  }

  // Axios postform logic

  function renderPostForm () {
    if (collActive == null) {
      return (<div></div>)
    } else {
      return (
        <PostForm data={data} collActive={collActive} id={data[collActive].cards.length}></PostForm>
      )
    }
  }

 
    return (
      <div>
        {createCollections()}
        {renderCardAndArrows(currentCard)}
        {renderPostForm()}
      </div>
    )
  
}

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// )
