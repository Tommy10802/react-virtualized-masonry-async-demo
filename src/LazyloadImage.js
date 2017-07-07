import React, { Component } from 'react'
import PropTypes from 'prop-types'

let PendingPool = {}
let ReadyPool = {}
let WidthPool = {}
let HeightPool = {}

class LazyloadImage extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onLoad: PropTypes.func.isRequired,
    defaultWidth: PropTypes.number.isRequired,
    defaultHeight: PropTypes.number.isRequired,
    fixedWidth: PropTypes.bool
  }
  img = null

  constructor (props) {
    super(props)
    this.state = {
      src: null
    }
    this.getStyle = this.getStyle.bind(this)
    this._onLoad = this._onLoad.bind(this)
  }

  componentWillMount () {
    this._load(this.props.src)
  }

  componentDidMount () {
    this.mounted = true
  }

  componentWillUnmount () {
    this.mounted = false
  }


  componentWillReceiveProps (nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({ src: null })
      this._load(nextProps.src)
    }
  }

  _load (src) {
    if (ReadyPool[src]) {
      this.setState({ src: src })
      return
    }

    if (PendingPool[src]) {
      PendingPool[src].push(this._onLoad)
      return
    }

    PendingPool[src] = [this._onLoad]

    let img = new Image()
    img.onload = () => {
      const { height, width } = img
      HeightPool[src] = height
      WidthPool[src] = width
      PendingPool[src].forEach(callback => {
        callback(src)
      })
      delete PendingPool[src]
      img.onload = null
      src = undefined
    }
    img.src = src
  }


  _onLoad (src) {
    ReadyPool[src] = true
    if (this.mounted && src === this.props.src) {
      this.setState({
        src: src
      }, () => this.props.onLoad())
    }
  }

  getStyle () {
    const { defaultWidth, defaultHeight, src: propsSrc, fixedWidth } = this.props
    const { src } = this.state
    if (src === propsSrc && WidthPool[src] && HeightPool[src]) {
      return {
        width: WidthPool[src],
        height: fixedWidth ? defaultWidth * HeightPool[src] / WidthPool[src] : HeightPool[src],
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover'
      }
    } else {
      return {
        width: defaultWidth,
        height: defaultHeight,
        backgroundColor: '#625b63'
      }
    }
  }

  render () {
    return (
      <div style={this.getStyle()} />
    )
  }
}

export default LazyloadImage