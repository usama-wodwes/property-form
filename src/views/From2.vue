<template>
    <div class="max-w-md mx-auto p-6 border rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Provide your property details</h2>
  
      <form @submit.prevent="submitPropertyForm" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium">Property Name:</label>
          <input
            type="text"
            v-model="form.propertyName"
            required
            class="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
          />
        </div>
  
        <div>
          <label class="block text-gray-700 font-medium">Address:</label>
          <input
            type="text"
            v-model="form.address"
            required
            class="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
          />
        </div>
  
        <div>
          <label class="block text-gray-700 font-medium">Property Type:</label>
          <select
            v-model="form.propertyType"
            required
            class="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
          >
            <option value="0">Lease Property</option>
            <option value="1">Owned Property</option>
          </select>
        </div>
  
        <div>
          <label class="block text-gray-700 font-medium">Upload Property Photo:</label>
          <input
            type="file"
            multiple
            @change="handleFileUpload"
            accept="image/jpeg, image/png"
            class="w-full p-2 border rounded-md"
          />
        </div>
  
        <button
          type="submit"
          class="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
        >
          Submit
        </button>
  
        <p v-if="message" class="text-center text-green-600 font-medium">{{ message }}</p>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from "vue";
  import { submitForm } from "../api";
  
  export default {
    setup() {
      const form = ref({
        propertyName: "Happy House",
        address: "1234 Broadway",
        propertyType: "0",
        propertyPhotos: [] as File[],
      });
  
      const message = ref("");
  
      const handleFileUpload = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files) {
          form.value.propertyPhotos = Array.from(input.files);
        }
      };
  
      const submitPropertyForm = async () => {
        const formData = new FormData();
        formData.append("propertyName", form.value.propertyName);
        formData.append("address", form.value.address);
        formData.append("propertyType", form.value.propertyType);
  
        form.value.propertyPhotos.forEach((file) => {
          formData.append("propertyPhotos", file);
        });
  
        try {
          const response = await submitForm(formData);
          message.value = response.data.message;
        } catch (error) {
          message.value = "Error submitting form";
        }
      };
  
      return { form, message, handleFileUpload, submitPropertyForm };
    },
  };
  </script>
  