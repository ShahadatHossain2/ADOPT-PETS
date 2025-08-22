// Showing Categories of pets

const loadCategory = async () => {
    document.getElementById('spinner').classList.remove("hidden")
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
        const data = await res.json()
        displayCategory(data.categories)
    }
    catch {
        console.log('Error')
    }
    finally {
        document.getElementById('spinner').classList.add("hidden")
    }
}

const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category-container')
    categories.forEach(category => {
        const div = document.createElement('div')
        // div.classList.add("selectedCategory","flex", "gap-3", "justify-center", "m-2", "items-center", "rounded-full", "p-3", "border", "border-indigo-100", "cursor-pointer")
        div.innerHTML = `
            <div class = "selectedCategory flex gap-3 justify-center m-2 items-center rounded-full p-3 border border-indigo-100 cursor-pointer">
                <img c src="${category.category_icon}" alt="">
                <h1 class="font-bold text-[25px]">${category.category}</h2>
            </div>
    `
        categoryContainer.appendChild(div)
        loadCategoryBasedPets(div, category)
    });

}

const loadAllPets = async (categories = "pets") => {
    document.getElementById('spinner-1').classList.remove("hidden")
    let allPets = [];
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/${categories}`)
        const data = await res.json()
        // displayAllPets(data.pets)
        if (typeof (data.data) === "undefined") {
            displayAllPets(data.pets)
            allPets = data.pets;
        }
        else {
            document.getElementById('pets-container').innerHTML = " "
            displayAllPets(data.data)
            allPets = data.data;
        }
    }
    catch {
        console.log('Error!')
    }
    finally {
        document.getElementById('spinner-1').classList.add("hidden")
    }
    document.getElementById('sort-button').addEventListener('click', () => {
        sortByView(allPets)
    })

}

const displayAllPets = (pets) => {
    const petContainer = document.getElementById('pets-container')
    petContainer.innerHTML = ""
    if (pets.length === 0) {
        petContainer.classList.remove("lg:grid", "md:grid")
        petContainer.innerHTML = `
        <div class="text-center lg:w-240 md:w-120 sm:w-60 p-2">
            <img class="mx-auto"
            src="images/error.webp"
            alt="pets" />
            <h2 class="font-bold text-[30px]">No Information Available</h2>
            <p class="text-[16px]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
            its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
        `
    }
    else {
        petContainer.classList.add("lg:grid", "md:grid")

    }
    pets.forEach(pet => {
        const div = document.createElement('div')
        div.classList.add("card", "bg-base-100", "p-3", "m-3", "shadow-sm")
        div.innerHTML = `
        <figure class="h-[160px] sm:w-[272px] lg:w-full xl:w-[272px] md:w-full">
            <img class="md:h-full md:w-full lg:h-full lg:w-full object-cover rounded-lg"
            src="${pet.image}"
            alt="pets" />
        </figure>
        <div class="">
            <h1 class="font-bold text-xl">
                ${pet.pet_name}
            </h1>
            <div class="text-gray-600">  
                <p><i class="fa-solid fa-table-cells-large"></i> ${pet.breed}</p>
                <p><i class="fa-regular fa-calendar"></i> ${pet.date_of_birth}</p>
                <p><i class="fa-solid fa-mercury"></i> ${pet.gender}</p>
                <p><i class="fa-regular fa-dollar-sign"></i> ${pet.price}$</p>
                <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700">
                <div class="flex justify-between">
                <button class="selectBtn btn btn-sm"><i class="fa-regular fa-thumbs-up"></i></button>
                <button class="font-bold text-blue-600 adopt btn btn-sm">Adopt</button>
                <button onClick ="loadDetails('${pet.petId}')" class="font-bold text-blue-600 btn btn-sm">Details</button>
                </div> 
            </div> 
        </div>
        `
        petContainer.appendChild(div)
        petImageSelector(div)
        countdown(div)
    });
}

const petImageSelector = (pet) => {
    const selectedContainer = document.getElementById('selected-pets')
    pet.querySelector('.selectBtn').addEventListener('click', (event) => {
        const figure = document.createElement('figure')
        figure.classList.add("h-[124px]", "w-[124px]", "p-3")
        figure.innerHTML = `
        <img class="h-full w-full object-cover rounded-lg"
            src="${pet.querySelector("img").src}"
            alt="pets" />
        `
        selectedContainer.appendChild(figure)
    })
}

const countdown = (div) => {
    let count = 3
    div.querySelector('.adopt').addEventListener('click', (event) => {
        const timer = setInterval(() => {
            event.target.innerHTML = count
            count--;
            if (count < 0) {
                event.target.innerHTML = "Adopted"
                clearInterval(timer)
            }
        }, 1000)
    })
}

const loadDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    const data = await res.json()
    showPetsDetails(data.petData)
}


const showPetsDetails = (pet) => {
    const modalContainer = document.getElementById('modal-content')
    modalContainer.innerHTML = ""
    const div = document.createElement('div')
    div.innerHTML = `
    <figure class="md:h-60 lg:h-60 md:w-116 lg:w-116 sm:w-70 sm:h-35">
            <img class="h-full w-full object-cover rounded-lg"
            src="${pet.image}"
            alt="pets" />
        </figure>
        <div class="my-3">
            <h1 class="font-bold text-xl">
                ${pet.pet_name}
            </h1>
            <div class="flex gap-10 text-[16px] text-gray-600">  
                <div class="">
                <p><i class="fa-solid fa-table-cells-large"></i> ${pet.breed}</p>
                <p><i class="fa-regular fa-calendar"></i> ${pet.date_of_birth}</p>
                <p><i class="fa-solid fa-mercury"></i> ${pet.gender}</p>
                </div> 
                <div class="">
                <p><i class="fa-solid fa-calendar-week"></i> ${pet.date_of_birth}</p>
                <p><i class="fa-regular fa-dollar-sign"></i> ${pet.price}$</p>
                </div> 
            </div> 
            <div class="my-3">
                <h3 class="font-bold">Details Information</h3>
                <p class="text-gray-600 text-[12px]">${pet.pet_details}</p>
            </div>
        </div>
    `
    modalContainer.appendChild(div)
    document.getElementById('my_modal_5').showModal()
}

const loadCategoryBasedPets = (container, category) => {
    const selected = container.querySelector(".selectedCategory")
    selected.addEventListener('click', async () => {
        loadAllPets(`category/${category.category}`)

        // displayAllPets(data.data)
    })
}

const sortByView = (data) => {
    data.sort((a, b) => 
        a.price - b.price
    )
    displayAllPets(data)
}

loadAllPets()
loadCategory()