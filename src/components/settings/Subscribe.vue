<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Read?</th>
          <th scope="col">Purchase Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" :key="index">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>
            <span v-if="book.read">Yes</span>
            <span v-else>No</span>
          </td>
          <td>${{ book.price }}</td>
          <td>
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-warning btn-sm"
                v-b-modal.book-update-modal
                @click="editBook(book)"
              >
                Update
              </button>
              <button type="button" class="btn btn-danger btn-sm" @click="onDeleteBook(book)">
                Delete
              </button>
            </div>
          </td>
          <td>
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-warning btn-sm"
                v-b-modal.book-update-modal
                @click="editBook(book)"
              >
                Update
              </button>
              <button type="button" class="btn btn-danger btn-sm" @click="onDeleteBook(book)">
                Delete
              </button>
              <button type="button" class="btn btn-primary btn-sm" @click="purchaseBook(book.id)">
                Purchase
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <b-form-group id="form-price-group" label="Purchase price:" label-for="form-price-input">
      <b-form-input
        id="form-price-input"
        type="number"
        step="0.01"
        v-model="addBookForm.price"
        required
        placeholder="Enter price"
      >
      </b-form-input>
    </b-form-group>
    <!-- add book modal -->
    <b-modal ref="addBookModal" id="book-modal" title="Add a new book" hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group id="form-title-group" label="Title:" label-for="form-title-input">
          <b-form-input
            id="form-title-input"
            type="text"
            v-model="addBookForm.title"
            required
            placeholder="Enter title"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-author-group" label="Author:" label-for="form-author-input">
          <b-form-input
            id="form-author-input"
            type="text"
            v-model="addBookForm.author"
            required
            placeholder="Enter author"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-price-group" label="Purchase price:" label-for="form-price-input">
          <b-form-input
            id="form-price-input"
            type="number"
            step="0.01"
            v-model="addBookForm.price"
            required
            placeholder="Enter price"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-read-group">
          <b-form-checkbox-group v-model="addBookForm.read" id="form-checks">
            <b-form-checkbox value="true">Read?</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addBookForm: {
        title: "",
        author: "",
        read: [],
        price: "",
      },
    };
  },
  components: {},
  computed: {},
  filters: {},
  methods: {
    purchaseBook(bookId) {
      console.log(bookId);
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addBookModal.hide();
      let read = false;
      if (this.addBookForm.read[0]) read = true;
      const payload = {
        title: this.addBookForm.title,
        author: this.addBookForm.author,
        read, // property shorthand
        price: this.addBookForm.price,
      };
      this.addBook(payload);
      this.initForm();
    },
  },
  initForm() {
    this.addBookForm.title = "";
    this.addBookForm.author = "";
    this.addBookForm.read = [];
    this.addBookForm.price = "";
    this.editForm.id = "";
    this.editForm.title = "";
    this.editForm.author = "";
    this.editForm.read = [];
  },
  /* @app.route('/books', methods=['GET', 'POST'])
def all_books():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        BOOKS.append({
            'id': uuid.uuid4().hex,
            'title': post_data.get('title'),
            'author': post_data.get('author'),
            'read': post_data.get('read'),
            'price': post_data.get('price')
        })
        response_object['message'] = 'Book added!'
    else:
        response_object['books'] = BOOKS
    return jsonify(response_object) */
};
</script>
