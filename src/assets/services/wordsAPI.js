class WordsAPI {
  baseURI = 'https://react-learnwords-example.herokuapp.com/';

  getCollectionWords = async (group, page) => {
    const response = await fetch(`${this.baseURI}words?page=${page}&group=${group}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  };
}

export default WordsAPI;
