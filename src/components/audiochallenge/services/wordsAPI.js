class WordsAPI {
  baseURI = 'https://afternoon-falls-25894.herokuapp.com/';

  getCollectionWords = async (group, page) => {
    const response = await fetch(`${this.baseURI}words?page=${page}&group=${group}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  };
}

export default WordsAPI;
