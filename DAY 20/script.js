function changeImage(imageSrc, description) {
    const displayedImage = document.getElementById("displayedImage");
    const descriptionText = document.getElementById("description");

    displayedImage.classList.remove("show");
    void displayedImage.offsetWidth;

    setTimeout(() => {
        displayedImage.src = imageSrc;
        descriptionText.textContent = description;
        displayedImage.classList.add("show");
    },100)

    const listItems = document.querySelectorAll(".list-item");
    listItems.forEach(item => item.classList.remove("active"));
    event.currentTarget.classList.add("active");
}