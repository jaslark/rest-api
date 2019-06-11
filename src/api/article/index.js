import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { password as passwordAuth, master, token } from '../../services/passport'
import { index, show, create, update, destroy } from './controller'
import { schema } from './model'
export Article, { schema } from './model'

const router = new Router()
const { title, content } = schema.tree

/**
 * @api {get} /articles Retrieve articles
 * @apiName RetrieveArticles
 * @apiGroup Article
 * @apiPermission user
 * @apiUse listParams
 * @apiSuccess {Object[]} articles List of articles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/',
  token({ required: true, roles: ['user'] }),
  query(),
  index)

  /**
   * @api {get} /articles/:id Retrieve Article
   * @apiName RetrieveArticle
   * @apiGroup Article
   * @apiParamExample {json} Request-Example:
   *     {
   *       "id": 1
   *     }
   * @apiSampleRequest /articles/:id
   * @apiParam {Number} id Articles unique id.
   * @apiPermission public
   * @apiSuccess {Object} article Article's data.
   * @apiError 404 User not found.
   */
router.get('/:id',
  show)

  /**
   * @api {post} /articles Create article
   * @apiName CreateArticle
   * @apiGroup Article
   * @apiPermission master
   * @apiParam {String} access_token Master access_token.
   * @apiParam {String} [title] Article's title.
   * @apiParam {String} [content] Article's content.
   * @apiParam {String=user,admin} [role=user] User's role.
   * @apiSuccess (Sucess 201) {Object} article Article's data.
   * @apiError {Object} 400 Some parameters may contain invalid values.
   * @apiError 401 Master access only.
   * @apiError 409 Email already registered.
   */
router.post('/',
  master(),
  body({ title, content }),
  create)

  /**
   * @api {put} /articles/:id Update article
   * @apiName UpdateArticle
   * @apiGroup Article
   * @apiPermission user
   * @apiParam {String} access_token Article access_token.
   * @apiParam {String} [title] Article's title.
   * @apiParam {String} [content] Article's content.
   * @apiSuccess (Sucess 201) {Object} article Article's data.
   * @apiError {Object} 400 Some parameters may contain invalid values.
   * @apiError 401 Current user or admin access only.
   * @apiError 404 User not found.
   */
router.put('/:id',
  token({ required: true }),
  body({ title, content }),
  update)

  /**
   * @api {delete} /articles/:id Delete article
   * @apiName DeleteArticle
   * @apiGroup Article
   * @apiPermission user
   * @apiParam {String} access_token Article access_token.
   * @apiSuccess (Success 204) 204 No Content.
   * @apiError 401 Admin access only.
   * @apiError 404 User not found.
   */
router.delete('/:id',
  token({ required: true}),
  destroy)

export default router
