import React from 'react'

const Try = () => {
  return (
    <div dangerouslySetInnerHTML={{
        __html: require('../assets/outputs/highlight.html').default
    }}>

    </div>
  )
}

export default Try