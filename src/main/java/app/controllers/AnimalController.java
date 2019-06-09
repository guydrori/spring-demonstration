package app.controllers;

import app.models.Animal;
import app.repositories.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController()
@RequestMapping(value = "/animal")
public class AnimalController {

    private AnimalRepository repository;

    @Autowired
    public AnimalController(AnimalRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/list")
    @CrossOrigin
    public Iterable<Animal> getAll() {
        return repository.findAll();
    }

    @GetMapping("/id/{id}")
    @CrossOrigin
    public Animal getById(@PathVariable(name = "id") Long id) {
        return repository.findById(id).orElse(null);
    }

    @GetMapping("/name/{name}")
    @CrossOrigin
    public Animal getByName(@PathVariable(name="name") String name) {
        return repository.findByName(name);
    }

    @PostMapping("/insert")
    @CrossOrigin
    public void insert(@RequestBody Animal newAnimal) {
        repository.save(newAnimal);
    }

    @DeleteMapping("/id/{id}")
    @CrossOrigin
    public void delete(@PathVariable(name="id") Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/id/{id}")
    @CrossOrigin
    public void edit(@PathVariable(name="id") Long id, @RequestBody Animal newAnimalData) {
        Animal existingAnimal = repository.findById(id).orElse(null);
        if (existingAnimal != null) {
            existingAnimal.setName(newAnimalData.getName());
            existingAnimal.setSpecies(newAnimalData.getSpecies());
            repository.save(existingAnimal);
        }
    }
}
