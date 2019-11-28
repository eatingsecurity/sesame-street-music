Sesame Street's Music
=================

This is a simple program using Node.js to query YouTube's API. In honor of Sesame Street's 50th anniversary, the default query searches Sesame Street's YouTube channel and adds "sesame street music" to the user-supplied search term. When the API query limit is hit, results of my choice will be shown.

YouTube's API is straightforward and you should have no problem changing search parameters, but the free query limit is easy to hit. See the following page for search.list parameters and result properties: <https://developers.google.com/youtube/v3/docs/search/list>.

Feel free to remix this. Thanks to Gltch for a simple way to learn and prototype JavaScript and Node.js.

Find out more [about Glitch](https://glitch.com/about).


Project details
------------

Query results are returned from `server.js` and passed to `search.ejs` for inclusion in the index page. This project uses embedded Javascript templates,`ejs`. See <https://ejs.co/> for more informaiton. 

On the front-end,
- `public/style.css`
- `views/index.ejs`
- `views/search.ejs`

On the back-end,
- the node.js app server, `server.js`
- frameworks and packages in `package.json`
- set API key in `.env`
- assets for files like images

There are many other ways to do this project and could add some slick features, but this seemed like the path of least resistance to get it up and running.
