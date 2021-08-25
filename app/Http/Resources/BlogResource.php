<?php

namespace App\Http\Resources;

use App\Http\Resources\CategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'discription' => $this->discription,
            'figure' => $this->figure,
            'category'  => new CategoryResource($this->category),
            'blog_date' => $this->blog_date,
            'likes' => $this->likes->count()
        ];
    }
}
