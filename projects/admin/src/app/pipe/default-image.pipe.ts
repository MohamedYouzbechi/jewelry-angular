import {Pipe, PipeTransform} from "@angular/core"

@Pipe({
  name : 'defaultImage'
})
export class DefaultImage implements PipeTransform{

  transform(
    imageUrl : string,
    placeholder : string,
    forceHttps : boolean = false
  ) {
      let image = imageUrl ? imageUrl : placeholder;
      // console.log('before', image);
      if (forceHttps) {
        if (image.indexOf('https') === -1) {
          image = image.replace('http', 'https')
        }
      }
      // console.log('after', image);
      return image;
  }

}
