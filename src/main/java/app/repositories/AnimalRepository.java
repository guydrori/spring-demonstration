package app.repositories;

import app.models.Animal;
import org.springframework.data.repository.CrudRepository;

public interface AnimalRepository extends CrudRepository<Animal,Long> {
    Animal findByName (String name);
}
