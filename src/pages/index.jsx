import React from "react";
import { Chatbot } from "popcat-chatbot";

class Answers extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { answers } = this.props;
    return (
      <div>
        {
          answers.map(an => (
            <div key={crypto.randomUUID()}>
              <p>{an.question}</p>
              <p>{an.answer}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answer: [],
    };

    const chatbot = new Chatbot()
      .setName("Chat Bot")
      .setGender("Male")
      .setOwner(crypto.randomUUID());

      this.bot = chatbot;
  }

  handleInput = (event) => {
    let question = event.target.value;
    let now = Date.now();

    this.setState({
      question: question,
      timestamp: now
    });
  }

  handleSend = () => {
    let newQuestion = this.state.question;
    this.bot.chat(newQuestion).then(answer => {
      let answers = [
        ...this.state.answer, {question: newQuestion, answer: answer, timestamp: Date.now()}
      ]

      this.setState({
        answer: answers
      });
    });
  }

  componentDidUpdate() {
    localStorage.setItem('answers', JSON.stringify(this.state.answer));
  }

  componentDidMount() {
    let answers = JSON.parse(localStorage.getItem('answers'));

    if (answers)
      this.setState({answer: answers});
  }

  render() {
    return (
      <>
        <main>
          <input placeholder="Ask your question." onChange={this.handleInput} />
          <button onClick={this.handleSend}>Send!</button>
          <Answers answers={this.state.answer} />
        </main>
      </>
    );
  }
}
