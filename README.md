# lexsearch.js 

 
A simple javascript code for finding words within a dictionary.  Creating crosswords or cheating in scrabble are the main area of usage of this script. 

  
[**View Demo**](http://git.lexsearch.net/) | [**Instructions**](#Instructions) | [**Dictionary**](#Dictionary) | [**Official Site**](http://lexsearch.net)   


 ![Demonstration](http://git.lexsearch.net/lexdemoimg.png)  

## Instructions:   
 
* download the js and the dictionary (mysql dump)
* import the dump to your mysql server.  
* add the js script to your html code.  Check out the examples for the simple usage of the lexsearch.js
  
  

## Dictionary:

The dictionary should have the following fields

* word (varchar)- *the actual word*
* wordsort (varchar) *letters of word sorted alphabetical e.g. ROCK ->CKOR*
* the word length (numeric) 

It is very easy to add your dictionary or to add different language, as far as your dictionary has the same definition as the original.
  
  
## Usage:


Specify your search terms and initiate lexSearch object. The basic input are:

* *letter*: the letters that the word should be made up. use * for wildcard.  Mostly used for scrabble search. 
* *pattern*: the pattern of the word e.g. *****ERT
* *word length*: the maximum word length (0 for all)
* *search method*: available search method: 
	* scrabble *(scr)*
	* contains *(con)*
	* start with *(sta)*
	* end with *(end)*
	* exact position *(exp)* 
	* For more help about search method, check out the official [lexsearch](http://lexsearch.net "official site") site

Quick Example 


 
    var ObjSearch = new lexSearch('ABCDEFH', '**AIR', 'con', 0);
    if(ObjSearch.isValid){
        console.log(ObjSearch.qryExplain); //query in native language
		console.log(ObjSearch.query);      //actual sql query

        //add code to use the query 

    }else{
       console.log(ObjSearch.errortxt);  //error    
    }
    


