var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четверг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
    author: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    bigText: React.PropTypes.string.isRequired
    })
  },
  //установка дефолтного состояния
  getInitialState: function() {
    return {
      visible: false
    };
  },
  readmoreClick: function(e) {
    e.preventDefault();
    this.setState({visible: true});
  },
  render: function(){
    var author = this.props.data.author,
        text = this.props.data.text,
        bigText = this.props.data.bigText,
        visible = this.state.visible; // считываем значение переменной из состояния комомента

    return (
      <div className='article'>
        <p className='news_author'>{author}:</p>
        <p className='news_text'>{text}</p>

        <a href="#"
           onClick={this.readmoreClick}
           className={'news_readmore ' + (visible ? 'none': '')}>
           Подробнее
        </a>

        <p className={'news_big-text ' + (visible ? '': 'none')}>{bigText}</p>
      </div>
    )
  }
});

var News = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  render: function(){
    var data = this.props.data;
    var newsTemplate;

    if (data.length > 0) {
      newsTemplate = data.map(function(item, index){
        return(
          <div key={index}>
            <Article data={item}/>
          </div>
        )
      });
    }else {
      newsTemplate = <p>К сожалению - новостей нет!</p>
    }

    return (
      <div className='news'>
        {newsTemplate}
        <strong className={'news_count ' + (data.length > 0 ? '':'none') }>
          Всего Новостей: {data.length}
        </strong>
      </div>
    );
  }
});

// --- добавили test input ---
var Add = React.createClass({
  componentDidMount: function() { //ставим фокус в input
    ReactDOM.findDOMNode(this.refs.author).focus();
  },
  onBtnClickHandler: function(e) {
    e.preventDefault();
  },
  onCheckRuleClick: function(e){
    ReactDOM.findDOMNode(this.refs.alert_button).disabled = !e.target.checked;
  },
  render: function() {
    return (
      <form className='add cf'>
        <input
        type='text'
        className='add_author'
        defaultValue=''
        placeholder='Ваше имя'
        ref='author'/>

        <textarea
          className='add_text'
          defaultValue=''
          placeholder='Текст новости'
          ref='text'>
        </textarea>

        <label className='add_checkrule'>
          <input type='checkbox' defaultChecked={false} ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с
          правилами
        </label>

        <button
          className='add_btn'
          onClick={this.onBtnClickHandler}
          ref='alert_button'
          disabled>
          Показать alert
        </button>
      </form>
    );
  }
});

var App = React.createClass({
  render: function(){
    return (
      <div className='app'>
        Новости
        <Add /> {/* добавили вывод компонента */}
        <News data={my_news}/> {/*Добавили свойство data*/}
      </div>
    )
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
