<template>
  <div id="app">
    <h1>vue-my-photos Demo</h1>
    <div id="filters">
      <form>
        <fieldset>
          <legend>Filter</legend>
          <span>
            <input type="radio" id="all" name="filters" checked v-on:click="updateFilter('all')" />
            <label for="all">All</label>
          </span>
          <span>
            <input type="radio" id="animals" name="filters" v-on:click="updateFilter('animals')" />
            <label for="animals">Animals</label>
          </span>
          <span>
            <input type="radio" id="natue" name="filters" v-on:click="updateFilter('nature')" />
            <label for="nature">Nature</label>
          </span>
        </fieldset>
      </form>
    </div>

    <transition-group name="thumbnailfade">
      <img
        v-for="thumb in filteredImages"
        :key="thumb.id"
        @click="showLightbox(thumb.name)"
        :src="thumbnailDir + thumb.name"
        :alt="thumb.alt"
        :title="thumb.alt"
      />
    </transition-group>

    <lightbox
      id="mylightbox"
      ref="lightbox"
      :images="images"
      :directory="thumbnailDir"
      :filter="galleryFilter"
      :timeout-duration="5000"
      :close-on-backdrop-click="true"
    />
  </div>
</template>

<script>
export default {};
</script>
