module.exports={
  plugins:[
    require('postcss-preset-env')()
  ]
}
/*
NOTE! post-css-env will use 
browserlist in package.json
module.exports={
  require('postcss-preset-env')({
      autoprefixer:{
        grid: true,
        flexbox: true
      },
      stage:3
    })
}*/