const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123',
  port: 5432,
})


//extract all quotes from a particular tag
const get_quote_by_id  = async (req , res) =>{
  let tag_name;
  try{
    const tag_res = await pool.query('select tag_name from tags where tag_id=$1' , [req.params.id] );
    tag_name = tag_res.rows[0].tag_name;
    }catch(err){
      console.log(err.stack);
    }
    pool.query('SELECT find_quote_by_tag($1) FROM quote', [tag_name],(error, results) => {
    if (error) {
      throw error
    }
    //console.log("Served by process id " + process.pid);
    res.render('quotes' , {"quotes" : results.rows[0].find_quote_by_tag.result , "t_name" : tag_name , "pid" : process.pid});
  })
};

//showing all tags
const show_tags =  (req , res) =>{
  pool.query('SELECT * from tags',(error, results) => {
    if (error) {
      throw error
    }
    console.log("process id is " + process.pid);
    res.render('index' , {"tags":results.rows , "pid" : process.pid});
  })
}

module.exports = {pool , get_quote_by_id , show_tags};
