import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from 'react-virtualized'
import { debounce } from 'lodash'
import LazyloadImage from './LazyloadImage'

class App extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    gut: PropTypes.number.isRequired
  }

  static getDefaultWidth ({ width, rows, gut }) {
    return (width - rows * gut) / rows
  }

  constructor (props) {
    super(props)
    this.init(props)
    this.shouldRecompute = this.shouldRecompute.bind(this)
  }

  init (props) {
    const { rows, gut } = props
    // Default sizes help Masonry decide how many images to batch-measure
    const cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: App.getDefaultWidth(props),
      fixedWidth: true
    })

    // Our masonry layout will use 3 columns with a 10px gutter between
    const cellPositioner = createMasonryCellPositioner({
      cellMeasurerCache: cache,
      columnCount: rows,
      columnWidth: App.getDefaultWidth(props),
      spacer: gut
    })
    this.cache = cache
    this.cellPositioner = cellPositioner
  }

  shouldRecompute () {
    const { rows, gut } = this.props
    if (this.masRef) {
      this.cellPositioner.reset({
        columnCount: rows,
        columnWidth: App.getDefaultWidth(this.props),
        spacer: gut
      })
      this.masRef.recomputeCellPositions()
      console.log('computed')
    }
  }

  render () {
    const { width, height } = this.props
    // Array of image urls
    const list = ["https://cdn.pixabay.com/photo/2017/07/02/16/16/fuchs-2464877__340.jpg", "https://cdn.pixabay.com/photo/2017/07/02/16/49/aurora-borealis-2464940__340.jpg", "https://cdn.pixabay.com/photo/2017/07/02/16/33/church-2464899__340.jpg", "https://cdn.pixabay.com/photo/2017/06/27/21/33/rose-2448893__340.jpg", "https://cdn.pixabay.com/photo/2017/06/30/21/37/deer-2459902__340.jpg", "https://cdn.pixabay.com/photo/2017/07/01/08/49/mallard-2460884__340.jpg", "https://cdn.pixabay.com/photo/2017/06/30/21/36/sunset-2459900__340.jpg", "https://cdn.pixabay.com/photo/2017/07/01/22/36/landscape-2462994__340.jpg", "https://cdn.pixabay.com/photo/2017/07/02/17/09/silhouette-2464994__340.jpg", "https://cdn.pixabay.com/photo/2017/07/01/19/42/boar-2462416__340.jpg", "https://cdn.pixabay.com/photo/2017/06/28/22/17/rose-2452355__340.jpg", "https://cdn.pixabay.com/photo/2017/06/18/15/03/cornflower-2416077__340.jpg", "https://cdn.pixabay.com/photo/2017/07/03/15/59/landscape-2468175__340.jpg", "https://cdn.pixabay.com/photo/2017/06/30/21/40/scotland-2459910__340.jpg", "https://cdn.pixabay.com/photo/2017/06/18/21/46/petunia-2417356__340.jpg", "https://cdn.pixabay.com/photo/2017/07/03/16/36/desert-2468275__340.jpg", "https://cdn.pixabay.com/photo/2017/06/28/19/40/hydrangeas-2451910__340.jpg", "https://cdn.pixabay.com/photo/2017/06/18/15/04/poppy-2416078__340.jpg", "https://cdn.pixabay.com/photo/2017/07/02/16/26/fantasy-2464889__340.jpg", "https://cdn.pixabay.com/photo/2017/06/27/17/55/primrose-2448269__340.jpg", "https://cdn.pixabay.com/photo/2017/06/20/13/10/vanilla-flower-2423041__340.jpg", "https://cdn.pixabay.com/photo/2017/06/06/19/53/flowers-2378271__340.jpg", "https://cdn.pixabay.com/photo/2017/06/28/22/03/flower-2452323__340.jpg", "https://cdn.pixabay.com/photo/2017/06/04/08/30/rhododendron-2370503__340.jpg", "https://cdn.pixabay.com/photo/2017/06/26/18/17/animal-2444636__340.jpg", "https://cdn.pixabay.com/photo/2017/06/27/19/37/bluebells-2448605__340.jpg", "https://cdn.pixabay.com/photo/2017/06/24/11/23/old-2437486__340.jpg", "https://cdn.pixabay.com/photo/2017/06/27/20/47/ape-2448799__340.jpg", "https://cdn.pixabay.com/photo/2017/06/27/18/49/ape-2448422__340.jpg", "https://cdn.pixabay.com/photo/2017/06/20/14/38/duck-2423262__340.jpg", "https://cdn.pixabay.com/photo/2017/06/29/20/09/geranium-2456035__340.jpg", "https://cdn.pixabay.com/photo/2017/06/23/09/46/mountains-2434154__340.jpg", "https://cdn.pixabay.com/photo/2017/06/22/18/40/goat-2432017__340.jpg", "https://cdn.pixabay.com/photo/2017/06/27/11/52/mountain-bike-2447170__340.jpg", "https://cdn.pixabay.com/photo/2017/07/01/13/42/towel-2461517__340.jpg", "https://cdn.pixabay.com/photo/2017/06/18/18/01/frog-2416629__340.jpg", "https://cdn.pixabay.com/photo/2017/06/13/23/07/dove-2400505__340.jpg", "https://cdn.pixabay.com/photo/2017/06/13/09/56/dandelion-2398243__340.jpg", "https://cdn.pixabay.com/photo/2017/07/02/16/20/fantasy-2464881__340.jpg", "https://cdn.pixabay.com/photo/2017/06/13/23/11/squirrel-2400515__340.jpg", "https://cdn.pixabay.com/photo/2017/06/21/22/36/rose-2428896__340.jpg", "https://cdn.pixabay.com/photo/2017/06/29/23/10/plant-2456552__340.jpg", "https://cdn.pixabay.com/photo/2017/06/14/11/05/ornamental-onion-2401868__340.jpg", "https://cdn.pixabay.com/photo/2017/06/27/18/49/ape-2448423__340.jpg", "https://cdn.pixabay.com/photo/2017/06/17/20/49/merganser-2413512__340.jpg", "https://cdn.pixabay.com/photo/2017/06/29/21/19/hedgehog-2456255__340.jpg", "https://cdn.pixabay.com/photo/2017/06/24/13/26/glass-bottle-2437757__340.png", "https://cdn.pixabay.com/photo/2017/06/22/10/52/lavender-2430395__340.jpg", "https://cdn.pixabay.com/photo/2017/06/22/19/39/boar-2432215__340.jpg", "https://cdn.pixabay.com/photo/2017/06/11/19/52/larkspur-2393345__340.jpg", "https://cdn.pixabay.com/photo/2017/06/27/08/03/model-2446617__340.jpg", "https://cdn.pixabay.com/photo/2017/07/01/15/42/mill-2461840__340.jpg", "https://cdn.pixabay.com/photo/2017/06/27/18/03/lily-2448290__340.jpg", "https://cdn.pixabay.com/photo/2017/06/16/11/28/rose-2408775__340.jpg", "https://cdn.pixabay.com/photo/2017/06/22/17/57/rose-2431866__340.jpg", "https://cdn.pixabay.com/photo/2017/06/24/20/29/cereals-2438752__340.jpg", "https://cdn.pixabay.com/photo/2017/06/26/14/35/demoiselle-2444003__340.jpg", "https://cdn.pixabay.com/photo/2017/06/10/18/27/rose-2390433__340.jpg", "https://cdn.pixabay.com/photo/2017/06/28/22/14/cat-2452349__340.jpg"]

    const cache = this.cache
    const cellPositioner = this.cellPositioner
    // const debouncedUpdate = this.shouldRecompute
    const debouncedUpdate = debounce(this.shouldRecompute, 100)

    const cellRenderer = ({ index, key, parent, style }) => {
      const url = list[index]
      return (
        <CellMeasurer
          cache={cache}
          index={index}
          key={key}
          parent={parent}
        >
          {
            ({ measure }) => {
              const handleOnload = () => {
                measure()
                debouncedUpdate()
              }
              return (
                <div style={style}>
                  <LazyloadImage
                    src={url}
                    defaultHeight={250}
                    defaultWidth={App.getDefaultWidth(this.props)}
                    onLoad={handleOnload}
                    fixedWidth
                  />
                </div>
              )
            }
          }

        </CellMeasurer>
      )
    }

    return (
      <Masonry
        ref={ele => this.masRef = ele}
        cellCount={list.length}
        cellMeasurerCache={cache}
        cellPositioner={cellPositioner}
        cellRenderer={cellRenderer}
        height={height}
        width={width}
      />
    )
  }
}

export default App
