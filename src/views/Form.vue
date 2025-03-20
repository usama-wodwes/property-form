<template>
  <div class="max-w-md mx-auto p-6 border rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">Provide your property details</h2>

    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block text-gray-700 font-medium">Property Name:</label>
        <input v-model="formData.propertyName" type="text" required class="w-full p-2 border rounded-md focus:ring focus:ring-green-300" />
      </div>

      <div>
        <label class="block text-gray-700 font-medium">Address:</label>
        <input v-model="formData.address" type="text" required class="w-full p-2 border rounded-md focus:ring focus:ring-green-300" />
      </div>

      <div>
        <label class="block text-gray-700 font-medium">Property Type:</label>
        <select v-model="formData.propertyType" required class="w-full p-2 border rounded-md focus:ring focus:ring-green-300">
          <option value="Lease Property">Lease Property</option>
          <option value="Owned Property">Owned Property</option>
        </select>
      </div>

      <div>
        <label class="block text-gray-700 font-medium">Upload Property Photo:</label>
        <input type="file" multiple accept="image/jpeg, image/png" @change="handleFileUpload" class="w-full p-2 border rounded-md" />
      </div>

      <button type="submit" class="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition">
        Submit
      </button>
    </form>
  </div>

  <div v-if="submittedData.length" class="max-w-4xl mx-auto mt-8 p-6 border rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4 text-gray-800">Submitted Data</h2>
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">Property Name</th>
          <th class="border p-2">Address</th>
          <th class="border p-2">Property Type</th>
          <th class="border p-2">Photos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in submittedData" :key="index">
          <td class="border p-2">{{ data.propertyName }}</td>
          <td class="border p-2">{{ data.address }}</td>
          <td class="border p-2">{{ data.propertyType }}</td>
          <td class="border p-2">
            <div v-if="data.photos.length">
              <img v-for="(photo, idx) in data.photos" :key="idx" :src="photo" class="w-16 h-16 object-cover rounded-md inline-block mr-2" />
            </div>
            <span v-else>No Photo</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const formData = ref({
  propertyName: "",
  address: "",
  propertyType: "Lease Property",
  photos: [],
});

const submittedData = ref([]);

const handleFileUpload = (event) => {
  const files = event.target.files;
  if (files) {
    formData.value.photos = Array.from(files).map(file => URL.createObjectURL(file));
  }
};

const submitForm = () => {
  submittedData.value.push({ ...formData.value });
  formData.value = {
    propertyName: "",
    address: "",
    propertyType: "Lease Property",
    photos: [],
  };
};
</script>
