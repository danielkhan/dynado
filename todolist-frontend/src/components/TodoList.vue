<template>
  <div class="container pt-3">
    <b-alert v-model="showAlert" variant="danger" dismissible>
      {{ alertMessage }}
    </b-alert>

    <div class="row">
      <div class="col-12 py-5">
        <h1>
          {{ listName }}
          <svg v-if="showLoader" class="spinner" viewBox="0 0 50 50">
            <circle
              class="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="5"
            ></circle>
          </svg>
        </h1>
      </div>
    </div>
    <div class="row mb-3">
      <create-todo @on-new-todo="addTodo($event)" />
    </div>
    <div class="row">
      <div class="col-12 col-sm-10 col-lg-6">
        <ul class="list-group">
          <todo
            v-for="(todo, index) in todos"
            :key="index"
            :description="todo.item"
            :completed="todo.completed"
            @on-toggle="toggleTodo(todo)"
            @on-delete="deleteTodo(todo)"
            @on-edit="editTodo(todo, $event)"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';
import Todo from './Todo.vue';
import CreateTodo from './CreateTodo.vue';

export default {
  components: { Todo, CreateTodo },
  props: {
    listName: { type: String, default: 'Todo' }
  },
  data() {
    return {
      todos: [],
      showAlert: false,
      alertMessage: '',
      showLoader: false
    };
  },

  async mounted() {
    try {
      this.showLoader = true;
      const data = await api.getItems();
      this.todos = data.Items;
      this.showLoader = false;
    } catch (err) {
      this.triggerError(err);
    }
  },
  methods: {
    triggerError(error) {
      this.showLoader = false;
      this.showAlert = true;
      this.alertMessage = error.message;
      // eslint-disable-next-line no-console
      console.error(error);
    },
    async addTodo(newTodo) {
      try {
        this.showLoader = true;
        await api.createItem(newTodo, false);
        const data = await api.getItems();
        this.todos = data.Items;
        this.showLoader = false;
      } catch (err) {
        this.triggerError(err);
      }
    },
    async toggleTodo(todo) {
      try {
        this.showLoader = true;
        // eslint-disable-next-line no-param-reassign
        todo.completed = !todo.completed;
        await api.updateItem(todo.id, todo.item, todo.completed);
        this.showLoader = false;
      } catch (err) {
        this.triggerError(err);
      }
    },
    async deleteTodo(deletedTodo) {
      try {
        this.showLoader = true;
        await api.deleteItem(deletedTodo.id);
        const data = await api.getItems();
        this.todos = data.Items;
        this.showLoader = false;
      } catch (err) {
        this.triggerError(err);
      }
    },
    async editTodo(todo, newTodoDescription) {
      try {
        this.showLoader = true;
        // eslint-disable-next-line no-param-reassign
        todo.item = newTodoDescription;
        await api.updateItem(todo.id, newTodoDescription, todo.completed);
        this.showLoader = false;
      } catch (err) {
        this.triggerError(err);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;

  & .path {
    stroke: hsl(210, 70, 75);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
