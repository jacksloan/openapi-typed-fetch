// EXAMPLE
import { createApiClient } from './index';
import { petStore } from './petstore.openapi';

async function getPets() {
  const api = createApiClient(petStore);

  const pets = await api["/pets"].get({ query: { limit: 50 } });

  const firstPet = await api["/pets/{petId}"].get({ params: { petId: 1 } });

  console.log(firstPet, pets);
}

(async () => await getPets())();
