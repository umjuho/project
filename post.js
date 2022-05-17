const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
  let postnum = 1;
  let date = 'yyyy.mm.dd';
  const writer = 'writer';
  let rcount = 1;
  let postTitle = 'Write title here!';
  let postContent = 'Write something here!';
  let attach = '첨부파일';

  res.render('post', { 
    title: 'FAQ | Hotel YJ Fukuoka',
    postnum,
    date,
    writer,
    rcount,
    postTitle,
    postContent,
    attach
  });
});

module.exports = router;