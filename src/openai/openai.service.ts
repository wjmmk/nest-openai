import { Injectable } from '@nestjs/common';
import { CreateOpenaiDto } from './dto/create-openai.dto';
import { UpdateOpenaiDto } from './dto/update-openai.dto';
import { Openai } from './entities/openai.entity';


@Injectable()
export class OpenaiService {

  items = [
  {
    id: 1101,
    title: 'Aprendiendo Angular Moderno',
    description: 'Framework de Frontend que te permite crear aplicaciones increibles.',
    keytopics: [
      'Componentes funcionales & reutilizables',
      'SPAs intuitivas',
      'Server Site Rendering',
      'Signals'
    ]
  }
]

  create(createOpenaiDto: CreateOpenaiDto): Openai {
    const newItem = new Openai();
    const maxItem = this.items.reduce((acc, item) => Math.max(acc, item.id), 0)
    newItem.id = maxItem + 1;
    newItem.title = createOpenaiDto.title;
    console.log(newItem)

    this.items.push(newItem)
    return newItem;
  }

  findAll(): Openai[] {
    return this.items;
  }

  findOne(id: number) {
    return `This action returns a #${id} openai`;
  }

  update(id: number, updateOpenaiDto: UpdateOpenaiDto) {
    return `This action updates a #${id} openai with ${JSON.stringify(updateOpenaiDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} openai`;
  }
}
