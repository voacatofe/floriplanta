-- CreateTable
CREATE TABLE "encyclopedia_terms" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "related_terms" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "meta_description" TEXT,
    "unresolved_related_terms" TEXT[],

    CONSTRAINT "encyclopedia_terms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "encyclopedia_terms_slug_key" ON "encyclopedia_terms"("slug");
