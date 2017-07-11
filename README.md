# React-virtualized-masonry-async-demo
> ref to https://github.com/bvaughn/react-virtualized/issues/723

[online demo](http://chuxdesign.com/playground/react-virtualized-masonry-async-demo/index.html)

## Modify it your self
### 1. Install
> `npm install`

### 2. Run
> `npm start`

### 3. Build
> `npm run build`

## Tip
This is my own approach, and it may still has some layout problem because of the debounced compute method.

But this approach is better than doing nothing. 

And once the images are all loaded or the Masonry component is remounted(when all pics are cached), it works fine. 
 
hope it helps :)
