<!-- Single file component (SFC) -->

<!-- JavaScript -->
<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import Detyra1 from '@/components/detyra/Detyra1.vue'
// Import local i komponentes
import ChildComp from '@/components/ChildComp.vue'
import ListPeople from '@/components/ListPeople.vue'
import TodoList from '@/components/todos/TodoList.vue'

// Variabla reaktive
const message = ref('Hello from Vue 3')
const vueLink = ref('https://vuejs.org/')
const id = ref(1)
const isBtnDisabled = ref(false)

const toggleButton = () => {
  console.log(isBtnDisabled.value) // false
  console.log(isBtnDisabled) // { value: false }
  // .value e perdorni vetem ne pjesen e skriptes
  // ne template nuk keni nevoje me perdore .value
  isBtnDisabled.value = !isBtnDisabled.value
}

function randomPlace() {
  return Math.random() > 0.5 ? 'Go to gym' : 'Drink coffe'
}

// reactivity
// ref pranon vlera primitive edhe duhet me iu qas me .value ne skripte
// reactive nuk pranon pranon vlera primivite nuk kemi nevoj per .value
const counter = ref(0)

const increment = (num) => {
  // counter.value = counter.value + num
  counter.value += num
}

const decrement = (num) => {
  counter.value = counter.value - num
}

const state = reactive({
  counter: 0,
})

const decr = () => {
  // .value nuk na duhet
  state.counter--
}

const incr = () => {
  state.counter++
}

const seen = ref(true)

const handleSubmit = () => {
  // event.preventDefault()
  alert('Form submitted!')
}

const firstName = ref('')
const confirmedFirstName = ref('')
const confirmFirstName = (e) => {
  // e.target.key = 'enter'
  confirmedFirstName.value = e.target.value
  firstName.value = ''
}

// const userId = ref(1)
// const userName = ref('Filan Fisteku')
// const userAge = ref(22)

const userRef = ref({
  id: 1,
  name: 'Filane Fisteku',
  age: 20,
})

// { userRef: {} }

console.log(userRef.value.id)

const user = reactive({
  id: 1,
  name: 'Filan Fisteku',
  age: 22,
})

// user: {}

console.log(user.id)

// computed properties
const author = reactive({
  name: 'Filan Fisteku',
  books: [
    { title: 'Vue.js 3', year: 2020 },
    { title: 'JavaScript', year: 2021 },
  ],
})

const hasPublishedBooks = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})

const randomPlaceComputed = computed(() => {
  return Math.random() > 0.5 ? 'Go to gym' : 'Drink coffe'
})

// Class and style binding
const isActive = ref(true)
const hasError = ref(false)
const classObject = reactive({
  active: true,
  'text-danger': false,
})

const isCompleted = ref(false)
const classObjectComputed = computed(() => {
  return {
    // completed: isCompleted.value === true,
    completed: isCompleted.value,
    'text-danger': !isCompleted.value, // && hasError.value,
    // 'text-danger': isCompleted.value === false,
  }
})

const activeClass = ref('active')
const errorClass = ref('text-danger')

// bind style attribute
const colorRed = ref('red')
const upperCase = ref('uppercase')
const styleObject = reactive({
  color: 'red',
  textTransform: 'uppercase',
})

// Conditional rendering
const awesome = ref(true)
const type = ref('C')

// v-model
const userInp = ref('')
// const onUserInput = (e) => {
//   userInp.value = e.target.value
// }

// // Todo list
// let todoId = 1
// const newTodo = ref('')
// const todos = ref([
//   { id: todoId++, title: 'Learn Vue.js', completed: true },
//   { id: todoId++, title: 'Learn React.js', completed: false },
// ])
// const addTodo = () => {
//   // if (newTodo.value.trim() === '') {
//   //   alert('Please enter a todo')
//   //   return
//   // }

//   // vlera === '' => false => '' === false => false
//   // !false => true

//   // if (newTodo.value === '' || newTodo.value === null || newTodo.value === undefined) {
//   //   alert('Please enter a todo')
//   //   return
//   // }

//   if (!newTodo.value) {
//     alert('Please enter a todo')
//     return
//   }

//   todos.value.push({
//     id: todoId++,
//     title: newTodo.value,
//     completed: false,
//   })

//   newTodo.value = ''
// }

// const removeTodo = (id) => {
//   // const index = todos.value.findIndex((todo) => todo.id === id)

//   // filtroj te gjitha perpos kesaj id dhe mbishkruje array-in
//   todos.value = todos.value.filter((todo) => todo.id !== id)
// }

// const hideCompleted = ref(false)
// const filteredTodos = computed(() => {
//   if (hideCompleted.value) {
//     return todos.value.filter((todo) => !todo.completed)
//   } else {
//     return todos.value
//   }
// })

// Form input bindings
const text = ref('')
const textArea = ref('')
const checked = ref(false)
const checkedNames = ref(['anda'])
const picked = ref('two')
const pickOptions = reactive({
  one: 'one',
  two: 'two',
})
const selected = ref('')
const options = ref([
  { val: 'a', text: 'A' },
  { val: 'b', text: 'B' },
  { val: 'c', text: 'C' },
  { val: 'd', text: 'D' },
])
const number = ref(null)

// Components
// emri parametrit sipas deshires, te ky parameter mapohet vlera e derguar prej comp child
const handleChildEvent = (msg) => {
  // alert(msg)
  alert(`${msg.name} is ${msg.age} years old`)
}

const onDeletePerson = (id) => {
  alert(`Delete person with id: ${id}`)
}

// Router
const router = useRouter()
const goToUser = (id) => {
  //  router.push(`/user/${id}`) // navigimi me path
  router.push({ name: 'user', params: { id: id } })
}

// Store
const store = useCounterStore()
</script>

<!-- HTML -->
<template>
  <h1>{{ message }}</h1>
  <!-- <h1>Vue link: <a v-bind:href="vueLink"></a></h1> -->

  <!-- Dynamic binding attribute -->
  <h1 :id="`id-${id}`">Vue link: <a :href="vueLink">vue</a></h1>

  <button :disabled="isBtnDisabled">Disabled button</button>
  <!-- <button v-on:click="">Toggle button</button> -->
  <!-- <button @click="isBtnDisabled = !isBtnDisabled">Toggle button</button> -->
  <button @click="toggleButton">Toggle Button</button>
  <!-- {{ Math.random() > 0.5 ? 'Drink coffe' : 'Go to gym' }} -->
  {{ randomPlace() }}

  <br />

  <br />
  <!-- reactivity -->
  <!-- <button @click="counter--">-</button> -->
  <button @click="decrement(1)">-</button>
  <button @click="decrement(5)">-5</button>
  <span>{{ counter }}</span>
  <button @click="increment(1)">+</button>
  <button @click="increment(10)">+10</button>
  <!-- <button @click="counter++">+</button> -->

  <br />
  <br />
  <!-- <button @click="state.counter--">-</button> -->
  <button @click="decr">-</button>
  <span>{{ state.counter }}</span>
  <!-- <button @click="state.counter++">+</button> -->
  <button @click="incr">+</button>

  <br />

  <!-- Directives (v-bind, v-on, v-if) -->
  <p v-if="seen">Now you see me!</p>
  <button @click="seen = !seen">{{ seen ? 'Hide' : 'Show' }} paragraph</button>

  <br />

  <!-- Modifiers -->
  <form @submit.prevent="handleSubmit">
    <input type="text" />
    <button>Submit</button>
  </form>

  <input type="text" placeholder="First name" :value="firstName" @keyup.enter="confirmFirstName" />
  <input type="text" placeholder="Confirmed first name" :value="confirmedFirstName" />

  <!-- Computed -->
  <!-- <p>Has published books: {{ author.books.length > 0 ? 'Yes' : 'No' }}</p> -->
  <p>Has published books: {{ hasPublishedBooks }}</p>
  <p>Random place: {{ randomPlaceComputed }}</p>

  <!-- Class and style binding -->
  <!-- 'active' emri i klases ne css, 'isActive' emri i variables -->
  <p class="emri-klases" :class="{ active: isActive, 'text-danger': hasError }">
    Class and style binding
  </p>
  <p :class="classObject">Class object</p>
  <p :class="classObjectComputed">Computed styling</p>
  <button @click="isCompleted = !isCompleted">Toggle completed</button>

  <!-- Binding to array -->
  <p :class="['active', 'text-danger']">Binding to array</p>
  <p :class="[activeClass, errorClass]">Binding to array</p>
  <p :class="[isCompleted ? 'completed' : '', activeClass]">Binding to array</p>
  <p :style="{ color: colorRed, textTransform: upperCase }">Style binding</p>
  <p :style="styleObject">Style binding object</p>

  <Detyra1 />

  <!-- Conditional rendering -->

  <p v-if="awesome">Vue is awesome</p>
  <!-- <span></span> -->
  <!-- <p></p> -->
  <p v-else>Oh nooo.....</p>
  <button @click="awesome = !awesome">Toggle</button>

  <p v-if="type === 'A'">A</p>
  <p v-else-if="type === 'B'">B</p>
  <!-- <span></span> -->
  <p v-else>Not A/B</p>

  <template v-if="false">
    <h3>Vue</h3>
    <p>Learn vue</p>
  </template>
  <template v-else>
    <h3>React</h3>
    <p>Learn react</p>
  </template>

  <p v-show="awesome">V-show</p>
  <!-- <p v-else></p> -->

  <!-- List rendering -->
  <h3>Author: {{ author.name }}</h3>
  <p>Books:</p>
  <ul v-if="author.books.length > 0">
    <!-- <li v-for="book in author.books">{{ book.title }} ({{ book.year }})</li> -->
    <!-- <li v-for="(book, index) in author.books">{{ index }} - {{ book.title }} ({{ book.year }})</li> -->
    <li v-for="({ title: titulli, year }, index) in author.books" v-bind:key="index">
      {{ index }} - {{ titulli }} ({{ year }})
    </li>
  </ul>
  <p v-else>No books</p>

  <!-- Object iteration -->
  <!-- Vlera e pare eshte value, e dyta key, e treta index -->
  <!-- Warning: mos e perdorni v-if dhe v-for ne te njejtin vend -->
  <!-- Eshte mire me vendos :key sa here qe perdorni v-for -->
  <ul>
    <li v-for="(u, k, i) in user" :key="i">{{ i }} - {{ k }} - {{ u }}</li>
  </ul>

  <!-- v-model - input binding -->
  <!-- Two way data binding -->
  <!-- <input type="text" :value="userInp" @input="onUserInput" /> -->
  <input type="text" v-model="userInp" />
  {{ userInp }}

  <!-- Todo list
  <h3>Todo list</h3>
  <input type="text" placeholder="Add new todo" v-model.trim="newTodo" @keyup.enter="addTodo" />
  <button @click="addTodo">+ Add</button>

  <ul v-if="todos.length > 0">
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.completed" />
      <span :class="{ completed: todo.completed }">{{ todo.id }} - {{ todo.title }}</span>
      <button @click="removeTodo(todo.id)">X</button>
    </li>
  </ul>
  <p v-else>No todos</p>

  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button> -->

  <!-- Form input bindings -->
  <h3>Form input binding</h3>

  <h4>Text</h4>
  <input type="text" v-model="text" />
  <p>Text: {{ text }}</p>

  <h4>Text area</h4>
  <textarea v-model="textArea"></textarea>
  <p>Text area: {{ textArea }}</p>

  <h4>Checkbox</h4>
  <input type="checkbox" id="chk" v-model="checked" />
  <label for="chk">Is checked</label>
  <p>Checked: {{ checked }}</p>

  <h4>Check names</h4>
  <!-- 
      value ruhet ne array-in e deklaruar ne skripte
      checkedNames = ['anda', 'arber']
      v-model duhet te jete i njejte per te gjithe checkbox-at
      v-model="checkedNames" do te thote se checkbox-at do te ruajne vlerat ne array-in checkedNames
  -->
  <input type="checkbox" id="anda" value="anda" v-model="checkedNames" />
  <label for="anda">Anda</label>

  <input type="checkbox" id="arber" value="arber" v-model="checkedNames" />
  <label for="arber">Arber</label>

  <input type="checkbox" id="bleron" value="bleron" v-model="checkedNames" />
  <label for="bleron">Bleron</label>

  <p>Checked names: {{ checkedNames }}</p>

  <h4>Radio button</h4>

  <input type="radio" id="one" :value="pickOptions.one" v-model="picked" />
  <label for="one">One</label>

  <input type="radio" id="two" :value="pickOptions.two" v-model="picked" />
  <label for="two">Two</label>
  <p>Picked: {{ picked }}</p>

  <h4>Select</h4>
  <!-- <select v-model="selected">
    <option value="" disabled>Please select one</option>
    <option value="a">A</option>
    <option value="b">B</option>
    <option value="c">C</option>
  </select> -->
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option v-for="opt in options" :key="opt.val" :value="opt.val">{{ opt.text }}</option>
  </select>
  <p>Selected: {{ selected }}</p>

  <h4>Trim/Number modifiers</h4>
  <input type="text" v-model.trim="text" />
  <input type="number" v-model.number="number" />
  <p>Text: {{ text }}</p>
  <p>Number: {{ number }}</p>

  <!-- 
      Detyre

      Forme @submit.prevent
      1. emri (text)
      2. mbiemri (text)
      3. mosha (number)
      4. gjinia (radio)
      5. hoby (checkbox multiple)
      6. a eshte student (checkbox)
      7. drejtimi (select)
      8. validoni inputat a kane vlere (empty)
      9. button submit formen
      10. Ruani ne nje array
      11. array-in shfaqeni ne nje tabele (v-for)

  -->

  <h3>Components</h3>

  <!-- <ChildComp name="Arber" /> -->
  <!-- <child-comp name="Anda" :age="20" /> -->
  <child-comp :user="{ name: 'Filan', age: 30 }" @child-event="handleChildEvent" />

  <!-- 
    Te dhenat qe i keni ruajt ne objekt me i dergu si prop me nje komponente te re qe
    ka me bo shfaqjen e te dhenave 
    emit butonin delete qe e emit nje event te comp prind me index ose id te rreshtit qe e keni klikuar 
  -->

  <list-people
    :people="[
      { id: 1, name: 'Jane Doe', age: 25 },
      { id: 2, name: 'John Doe', age: 30 },
      { id: 3, name: 'Mary Jane', age: 35 },
    ]"
    @delete-person="onDeletePerson"
  />

  <todo-list />

  <h2>Router</h2>
  <!-- <RouterLink to="/">Home</RouterLink> -->
  <!-- Gjeneron ni a tag me href atributin -->
  <!-- <a href="/about">About</a> !!!! don't -->
  <router-link to="/about">About with path</router-link>
  <br />
  <router-link :to="{ name: 'about' }">About with name</router-link>
  <br />
  <router-link to="/user/1">User 1</router-link>
  <br />
  <router-link :to="{ name: 'user', params: { id: 2 } }">User 2</router-link>
  <br />
  <button @click="goToUser(3)">Go to user 3</button>

  <h2>Store</h2>
  <p>Count: {{ store.count }}</p>

  <!-- 
       Detyre

       PeopleView (buton qe bon delete personin prej array-it ne store)
       AddPersonView (shton pernonin e ri ne array)
       UpdatePersonView (kerko personin me id qe vjen prej url) 

       Definojeni nje store te ri usePeopleStore qe permban metodat per addPerson, updatePerson, deletePerson
       array-in e personave e ruani ne store
   -->
</template>

<!-- CSS, scoped kodi i css aplikohet vetem ne kete file -->
<style scoped>
.active {
  font-weight: bold;
}

.completed {
  text-decoration: line-through;
  color: green;
}

.text-danger {
  color: red;
}
</style>
